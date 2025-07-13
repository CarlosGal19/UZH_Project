import Types "Types";
import Result "mo:base/Result";

module {

    private func isEmpty(text : Text) : Bool {
        return text == "";
    };

    private func validateComplainant(c : Types.Complainant) : Result.Result<(), Text> {
        if (isEmpty(c.firstName)) return #err("firstName is required");
        if (isEmpty(c.lastName)) return #err("lastName is required");
        if (isEmpty(c.middleName)) return #err("middleName is required");
        if (isEmpty(c.street)) return #err("street is required");
        if (isEmpty(c.number)) return #err("number is required");
        if (isEmpty(c.neighborhood)) return #err("neighborhood is required");
        if (isEmpty(c.municipality)) return #err("municipality is required");
        if (isEmpty(c.state)) return #err("state is required");
        if (isEmpty(c.phone)) return #err("phone is required");
        if (isEmpty(c.email)) return #err("email is required");

        return #ok;
    };

    public func validateReport(r : Types.Report) : Result.Result<(), Text> {
        if (isEmpty(r.state)) return #err("Missing field: state");
        if (isEmpty(r.municipality)) return #err("Missing field: municipality");
        if (isEmpty(r.affectedLegalInterest)) return #err("Missing field: affectedLegalInterest");
        if (isEmpty(r.crimeType)) return #err("Missing field: crimeType");
        if (isEmpty(r.subtype)) return #err("Missing field: subtype");
        if (isEmpty(r.time)) return #err("Missing field: time");
        if (isEmpty(r.description)) return #err("Missing field: description");

        switch (validateComplainant(r.complainant)) {
            case (#err(msg)) return #err("Complainant: " # msg);
            case (#ok) {};
        };

        return #ok;
    };
};
