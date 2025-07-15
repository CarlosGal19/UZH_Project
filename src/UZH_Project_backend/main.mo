import Types "Types";
import Helpers "Helpers";
import Array "mo:base/Array";
import Nat32 "mo:base/Nat32";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

actor {

  // Al inicio de tu archivo, después de los imports
  type NFTCanister = actor {
    createToken : (Types.Report) -> async Result.Result<Nat, { #InvalidReport }>;
  };

  // Principal ID del canister NFT (reemplaza con el ID real)
  let NFT_CANISTER_ID = "uxrrr-q7777-77774-qaaaq-cai";
  let nftCanister : NFTCanister = actor (NFT_CANISTER_ID);

  private stable var nfts : [Types.Nft] = [];

  public shared func addNft(report : Types.Report, _address : Principal) : async Types.ReportResult {
    switch (Helpers.validateReport(report)) {
      case (#ok) {
        try {
          // Llamar a createToken del otro canister
          let tokenResult = await nftCanister.createToken(report);

          switch (tokenResult) {
            case (#ok(tokenId)) {
              Debug.print("NFT created successfully with ID: " # debug_show (tokenId));
              return #ok(report);
            };
            case (#err(mintError)) {
              Debug.print("Error creating NFT: " # debug_show (mintError));
              return #err("Failed to create NFT: " # debug_show (mintError));
            };
          };
        } catch (_) {
          Debug.print("Inter-canister call failed: ");
          return #err("Inter-canister call failed");
        };
      };
      case (#err(msg)) {
        return #err(msg);
      };
    };
  };

  public func updateStatus(nft_hash : Nat32, status : Text) : async Result.Result<Types.Nft, Text> {
    if (status == "") return #err("The new status is required");

    switch (Helpers.findNft(nfts, nft_hash)) {
      case (#ok(nft)) {
        // Create a new NFT object with updated status
        let updatedNft : Types.Nft = {
          hash = nft.hash;
          status = status;
          created_at = nft.created_at;
          updated_at = Helpers.getCurrentTimestamp();
        };

        // Update the array by replacing the NFT with matching hash
        nfts := Array.map<Types.Nft, Types.Nft>(
          nfts,
          func(nft) {
            if (nft.hash == nft_hash) {
              updatedNft;
            } else {
              nft;
            };
          },
        );

        return #ok(updatedNft);
      };
      case (#err(msg)) {
        return #err(msg);
      };
    };
  };

  public func getCrimeTypes() : async [Types.CrimeTypeResult] {
    switch (Helpers.getCrimes()) {
      case (#ok(crimes)) {
        return Array.map<Types.CrimeResponse, Types.CrimeTypeResult>(
          crimes,
          func(crime) {
            #ok(crime);
          },
        );
      };
      case (#err(msg)) {
        return [#err(msg)];
      };
    };
  };

  public func getSubtypes(crime : Text) : async [Types.CrimeSubTypeResult] {
    switch (Helpers.getCrimeSubtypes(crime)) {
      case (#ok(subtypes)) {
        return Array.map<Types.CrimeSubtypeResponse, Types.CrimeSubTypeResult>(
          subtypes,
          func(subtype) {
            #ok(subtype);
          },
        );
      };
      case (#err(msg)) {
        return [#err(msg)];
      };
    };
  };

  public func getAffectedLegalInterests() : async [Types.AffectedLegalInterestsResult] {
    switch (Helpers.getAffectedLegalInterests()) {
      case (#ok(subtypes)) {
        return Array.map<Types.AffectedLegalInterestsResponse, Types.AffectedLegalInterestsResult>(
          subtypes,
          func(subtype) {
            #ok(subtype);
          },
        );
      };
      case (#err(msg)) {
        return [#err(msg)];
      };
    };
  };

  public func getStatus() : async [Types.StatusResult] {
    switch (Helpers.getStatus()) {
      case (#ok(status)) {
        return Array.map<Types.StatusResponse, Types.StatusResult>(
          status,
          func(status) {
            #ok(status);
          },
        );
      };
      case (#err(msg)) {
        return [#err(msg)];
      };
    };
  };

};
