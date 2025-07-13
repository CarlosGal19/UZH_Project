import Types "Types";
import Helpers "Helpers";

actor {

  private stable var nfts: [Types.nft] = [];

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
};
