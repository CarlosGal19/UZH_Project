import Types "Types";
import Helpers "Helpers";
import Array "mo:base/Array";

actor {

  private stable var nfts : [Types.nft] = [];

  public shared func addNft(report : Types.Report) : async Types.ReportResult {
    switch (Helpers.validateReport(report)) {
      case (#ok) {
        return #ok(report);
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

  public func getSubtypes(crime: Text) : async [Types.CrimeSubTypeResult] {
    switch(Helpers.getCrimeSubtypes(crime)) {
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
    switch(Helpers.getAffectedLegalInterests()) {
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
  }

};
