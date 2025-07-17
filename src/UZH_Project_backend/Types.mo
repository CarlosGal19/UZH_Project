import Nat "mo:base/Nat";
import Int "mo:base/Int";

module {

  public type Nft = {
    hash: Nat;
    status: Text;
    created_at: Int;
    updated_at: Int;
  };

  public type CrimeWithSubtypes = {
    crimeType : Text;
    subtypes : [Text];
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

  public type CrimeResponse = {
    crime : Text;
  };

  public type CrimeSubtypeResponse = {
    subtype : Text;
  };

  public type StatusResponse = {
    name : Text;
  };

  public type AffectedLegalInterestsResponse = {
    name : Text;
  };

  public type ReportResult = {
    #ok : Report;
    #err : Text;
  };

  public type CrimeTypeResult = {
    #ok : CrimeResponse;
    #err : Text;
  };

  public type CrimeSubTypeResult = {
    #ok : CrimeSubtypeResponse;
    #err: Text;
  };

  public type AffectedLegalInterestsResult = {
    #ok : AffectedLegalInterestsResponse;
    #err: Text;
  };

  public type StatusResult = {
    #ok : StatusResponse;
    #err : Text;
  };

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

    public type TxError = {
    #Unauthorized;
    #TokenNotFound;
    #InvalidToken;
    #Rejected;
    #TxTooOld;
    #TxCreatedInFuture;
    #TxDuplicate;
  };
    public type TokenId = Nat;

    public type NFTMetadata = {
    tokenId : TokenId;
    owner : Principal;
    report : Report;
    createdAt : Int;
    reportHash : Text;
    qrImageUrl : Text; // Nueva propiedad para la URL del QR
  };
}
