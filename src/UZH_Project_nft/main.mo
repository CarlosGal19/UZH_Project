import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor ReportNFT {

  // DIP-721 Standard Types
  public type TokenId = Nat;
  public type TokenMetadata = {
    #Fungible : {
      name : Text;
      symbol : Text;
      decimals : Nat8;
      metadata : ?{#Blob : [Nat8]; #Text : Text};
    };
    #NonFungible : {
      name : Text;
      description : Text;
      image : Text;
      metadata : ?{#Blob : [Nat8]; #Text : Text};
    };
  };

  public type Report = {
    complainant : Complainant;
    accused : ?Accused;
    state : Text;
    municipality : Text;
    affectedLegalInterest : Text;
    crimeType : Text;
    subtype : Text;
    time : Text;
    description : Text;
  };

  public type Complainant = {
    firstName : Text;
    lastName : Text;
    middleName : Text;
    street : Text;
    number : Text;
    neighborhood : Text;
    municipality : Text;
    state : Text;
    phone : Text;
    email : Text;
  };

  public type Accused = {
    firstName : ?Text;
    lastName : ?Text;
    middleName : ?Text;
    street : ?Text;
    number : ?Text;
    neighborhood : ?Text;
    municipality : ?Text;
    state : ?Text;
    phone : ?Text;
  };

  public type NFTMetadata = {
    tokenId : TokenId;
    owner : Principal;
    report : Report;
    createdAt : Int;
    reportHash : Text;
  };

  public type MintError = {
    #Unauthorized;
    #InvalidReport;
    #TokenAlreadyExists;
  };

  // DIP-721 Error Types
  public type TxError = {
    #Unauthorized;
    #TokenNotFound;
    #InvalidToken;
    #Rejected;
    #TxTooOld;
    #TxCreatedInFuture;
    #TxDuplicate;
  };

  // Storage
  private stable var nextTokenId : TokenId = 1;
  private var tokens = HashMap.HashMap<TokenId, NFTMetadata>(0, Nat.equal, Hash.hash);
  private var tokenApprovals = HashMap.HashMap<TokenId, Principal>(0, Nat.equal, Hash.hash);
  private var operatorApprovals = HashMap.HashMap<Principal, [Principal]>(0, Principal.equal, Principal.hash);

  // Collection Info
  private stable var name : Text = "Report NFT Collection";
  private stable var symbol : Text = "RNFT";
  private stable var logo : Text = "https://www.cd.uzh.ch/dam/jcr:56974e80-5fd5-4e6e-ae69-8321e31387a4/uzh-logo.jpg";
  private stable var description : Text = "Official crime report NFTs";
  private stable var totalSupply : Nat = 0;

  // Dirección fija donde se transferirán todos los tokens
  private let RECIPIENT_ADDRESS : Principal = Principal.fromText("ehu7m-5l5r3-vztb7-3vbws-gj6q2-ad3ha-zsadj-ru6n3-ffnsi-r7ln4-rae");

  // Helper function to generate a simple hash from report data
  private func generateReportHash(report : Report) : Text {
    let complainantStr = report.complainant.firstName # report.complainant.lastName # report.complainant.email;
    let reportStr = report.crimeType # report.subtype # report.time # report.description;
    let combinedStr = complainantStr # reportStr # report.state # report.municipality;

    let hash = Text.hash(combinedStr);
    Nat.toText(Nat32.toNat(hash))
  };

  // Helper function to generate NFT metadata in DIP-721 format
  private func generateTokenMetadata(report : Report, tokenId : TokenId) : TokenMetadata {
    let name = "Report NFT #" # Nat.toText(tokenId);
    let description = "Crime Report: " # report.crimeType # " in " # report.municipality # ", " # report.state;
    let image = "https://example.com/report-nft-image.png"; // You can generate dynamic images

    #NonFungible({
      name = name;
      description = description;
      image = image;
      metadata = ?#Text("{\"report_hash\":\"" # generateReportHash(report) # "\",\"crime_type\":\"" # report.crimeType # "\",\"location\":\"" # report.municipality # "\"}");
    })
  };

  // DIP-721 Required Functions

  // Get collection metadata
  public query func dip721_name() : async Text { name };
  public query func dip721_symbol() : async Text { symbol };
  public query func dip721_logo() : async Text { logo };
  public query func dip721_description() : async Text { description };
  public query func dip721_total_supply() : async Nat { totalSupply };

  // Get token metadata
  public query func dip721_token_metadata(tokenId : TokenId) : async Result.Result<TokenMetadata, TxError> {
    switch (tokens.get(tokenId)) {
      case null { #err(#TokenNotFound) };
      case (?metadata) {
        #ok(generateTokenMetadata(metadata.report, tokenId))
      };
    };
  };

  // Get token owner
  public query func dip721_owner_of(tokenId : TokenId) : async Result.Result<Principal, TxError> {
    switch (tokens.get(tokenId)) {
      case null { #err(#TokenNotFound) };
      case (?metadata) { #ok(metadata.owner) };
    };
  };

  // Get owner token count
  public query func dip721_balance_of(owner : Principal) : async Nat {
    var count = 0;
    for ((tokenId, metadata) in tokens.entries()) {
      if (metadata.owner == owner) {
        count += 1;
      };
    };
    count
  };

  // Get tokens owned by address
  public query func dip721_owner_token_identifiers(owner : Principal) : async [TokenId] {
    var result : [TokenId] = [];
    for ((tokenId, metadata) in tokens.entries()) {
      if (metadata.owner == owner) {
        result := Array.append(result, [tokenId]);
      };
    };
    result
  };

  // Get token URI (metadata URL)
  public query func dip721_token_uri(tokenId : TokenId) : async Result.Result<Text, TxError> {
    switch (tokens.get(tokenId)) {
      case null { #err(#TokenNotFound) };
      case (?_) {
        // Return URL where metadata JSON can be fetched
        #ok("https://your-domain.com/metadata/" # Nat.toText(tokenId))
      };
    };
  };

  // Check if token exists
  public query func dip721_supported_interfaces() : async [Text] {
    ["DIP721v2"]
  };

  // Main Functions

  // Función 1: Crear token NFT real (transferido automáticamente a la dirección fija)
  public func createToken(report : Report) : async Result.Result<TokenId, MintError> {
    // Validate report
    if (Text.size(report.complainant.firstName) == 0 or
        Text.size(report.complainant.lastName) == 0 or
        Text.size(report.crimeType) == 0) {
      return #err(#InvalidReport);
    };

    // Generate metadata
    let currentTime = Time.now();
    let tokenId = nextTokenId;
    let reportHash = generateReportHash(report);

    let metadata : NFTMetadata = {
      tokenId = tokenId;
      owner = RECIPIENT_ADDRESS;
      report = report;
      createdAt = currentTime;
      reportHash = reportHash;
    };

    // Store the NFT
    tokens.put(tokenId, metadata);

    // Update counters
    nextTokenId += 1;
    totalSupply += 1;

    #ok(tokenId)
  };

  // Función 2: Obtener metadatos del token (formato completo)
  public query func getTokenMetadata(tokenId : TokenId) : async ?NFTMetadata {
    tokens.get(tokenId)
  };

  // Additional utility functions for DIP-721 compliance

  // Get all token IDs
  public query func dip721_total_token_identifiers() : async [TokenId] {
    Iter.toArray(tokens.keys())
  };

  // Transfer function (required by DIP-721)
  public func dip721_transfer(to : Principal, tokenId : TokenId) : async Result.Result<Int, TxError> {
    let caller = Principal.fromActor(ReportNFT);

    switch (tokens.get(tokenId)) {
      case null { #err(#TokenNotFound) };
      case (?metadata) {
        if (metadata.owner != caller) {
          return #err(#Unauthorized);
        };

        let updatedMetadata = {
          tokenId = metadata.tokenId;
          owner = to;
          report = metadata.report;
          createdAt = metadata.createdAt;
          reportHash = metadata.reportHash;
        };

        tokens.put(tokenId, updatedMetadata);
        #ok(Time.now())
      };
    };
  };

  // Approve function (required by DIP-721)
  public func dip721_approve(spender : Principal, tokenId : TokenId) : async Result.Result<Int, TxError> {
    let caller = Principal.fromActor(ReportNFT);

    switch (tokens.get(tokenId)) {
      case null { #err(#TokenNotFound) };
      case (?metadata) {
        if (metadata.owner != caller) {
          return #err(#Unauthorized);
        };

        tokenApprovals.put(tokenId, spender);
        #ok(Time.now())
      };
    };
  };

  // Get approved address for token
  public query func dip721_get_approved(tokenId : TokenId) : async Result.Result<Principal, TxError> {
    switch (tokenApprovals.get(tokenId)) {
      case null { #err(#TokenNotFound) };
      case (?approved) { #ok(approved) };
    };
  };

  // Check if operator is approved
  public query func dip721_is_approved_for_all(owner : Principal, operator : Principal) : async Bool {
    switch (operatorApprovals.get(owner)) {
      case null { false };
      case (?operators) {
        Option.isSome(Array.find<Principal>(operators, func(p) { p == operator }))
      };
    };
  };

  // Set approval for all tokens
  public func dip721_set_approval_for_all(operator : Principal, approved : Bool) : async Result.Result<Int, TxError> {
    let caller = Principal.fromActor(ReportNFT);

    switch (operatorApprovals.get(caller)) {
      case null {
        if (approved) {
          operatorApprovals.put(caller, [operator]);
        };
      };
      case (?operators) {
        if (approved) {
          let newOperators = Array.append(operators, [operator]);
          operatorApprovals.put(caller, newOperators);
        } else {
          let newOperators = Array.filter<Principal>(operators, func(p) { p != operator });
          operatorApprovals.put(caller, newOperators);
        };
      };
    };

    #ok(Time.now())
  };
}
