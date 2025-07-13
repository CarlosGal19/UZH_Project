import Types "Types";

module {

    public let commonCrimes : [Types.CrimeWithSubtypes] = [
        {
            crimeType = "Theft";
            subtypes = ["Burglary", "Shoplifting", "Auto theft"];
        },
        {
            crimeType = "Assault";
            subtypes = ["Aggravated Assault", "Simple Assault", "Domestic Violence"];
        },
        {
            crimeType = "Fraud";
            subtypes = ["Identity Theft", "Credit Card Fraud", "Insurance Fraud"];
        },
        {
            crimeType = "Drug Possession";
            subtypes = ["Marijuana", "Cocaine", "Prescription Drugs"];
        },
        {
            crimeType = "Vandalism";
            subtypes = ["Graffiti", "Breaking Windows", "Defacing Property"];
        },
    ];

    public let affectedLegalInterests : [Text] = [
        "Property",
        "Life",
        "Physical Integrity",
        "Freedom",
        "Honour",
        "Public Safety",
        "Environment",
        "Economic Order",
        "Public Health",
        "Privacy",
    ];
};
