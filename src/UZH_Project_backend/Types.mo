module {

  public type nft = {
    hash: Text;
    status: Text;
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

  public type ReportResult = {
    #ok : Report;
    #err : Text;
  };
}

