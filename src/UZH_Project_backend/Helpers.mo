import Types "Types";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Mocks "Mocks";

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

    public func getCrimes() : Result.Result<[Types.CrimeResponse], Text> {
        if (Mocks.commonCrimes.size() == 0) return #err("There are not crimes");
        let crimes : [Types.CrimeResponse] = Array.map<Types.CrimeWithSubtypes, Types.CrimeResponse>(
            Mocks.commonCrimes,
            func(c : Types.CrimeWithSubtypes) : Types.CrimeResponse {
                {
                    crime = c.crimeType;
                };
            },
        );
        return #ok(crimes);
    };

    public func getStatus() : Result.Result<[Types.StatusResponse], Text> {
        if (Mocks.status.size() == 0) return #err("There are not status");
        let status : [Types.StatusResponse] = Array.map<Text, Types.StatusResponse>(
            Mocks.status,
            func(s: Text) : Types.StatusResponse {
                {
                    name = s
                };
            }
        );
        return #ok(status);
    };

    public func getCrimeSubtypes(crime : Text) : Result.Result<[Types.CrimeSubtypeResponse], Text> {
        if (crime == "") {
            return #err("Crime is required");
        };

        let maybeCrime = Array.find<Types.CrimeWithSubtypes>(
            Mocks.commonCrimes,
            func(c) { c.crimeType == crime },
        );

        switch (maybeCrime) {
            case (null) return #err("Crime not found");
            case (?crimeData) {
                let subtypes = Array.map<Text, Types.CrimeSubtypeResponse>(
                    crimeData.subtypes,
                    func(s) {
                        { subtype = s };
                    },
                );
                return #ok(subtypes);
            };
        };
    };

    public func getAffectedLegalInterests() : Result.Result<[Types.AffectedLegalInterestsResponse], Text> {
        if (Mocks.affectedLegalInterests.size() == 0) {
            return #err("There is no affected legal interests");
        };

        let interests : [Types.AffectedLegalInterestsResponse] = Array.map<Text, Types.AffectedLegalInterestsResponse>(
            Mocks.affectedLegalInterests,
            func(name : Text) : Types.AffectedLegalInterestsResponse {
                { name = name };
            },
        );

        return #ok(interests);
    };

};
