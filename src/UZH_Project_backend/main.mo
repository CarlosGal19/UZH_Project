import Types "Types";
import Helpers "Helpers";
import Array "mo:base/Array";
import Nat32 "mo:base/Nat32";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

actor {

  private stable var nfts : [Types.Nft] = [];

  public shared func addNft(report : Types.Report, _address: Principal) : async Types.ReportResult {
    switch (Helpers.validateReport(report)) {
      case (#ok) {
        return #ok(report);
      };
      case (#err(msg)) {
        return #err(msg);
      };
    };
  };

  public func updateStatus(nft_hash : Nat32, status : Text) : async Result.Result<Types.Nft, Text> {
    if (status == "") return #err("The new status is required");

    switch (findNft(nft_hash)) {
      case (#ok(report)) {
        // Create a new NFT object with updated status
        let updatedNft : Types.Nft = {
          hash = report.hash;
          status = status;
          created_at = report.created_at;
          updated_at = getCurrentTimestamp();
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
    }
  };

  private func findNft(hash : Nat32) : Result.Result<Types.Nft, Text> {
    if (hash == 0) {
      return #err("The report id is necessary");
    };

    let foundNft = Array.find<Types.Nft>(nfts, func(nft) = nft.hash == hash);

    switch (foundNft) {
      case null {
        #err("Report not found");
      };
      case (?nft) {
        #ok(nft);
      };
    };
  };

  private func getCurrentTimestamp() : Int {
    return Time.now();
  };

};
