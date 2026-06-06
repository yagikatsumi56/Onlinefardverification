async function populateFard() {
    const base64_id = new URLSearchParams(window.location.search).get("data");
    const _id = atob(base64_id);

    const res = await fetch(
        "https://fard-api-5cb0.onrender.com/api/fard/by/?id=" + _id
    );

    /**
     * @type {import("../fard.d.ts").TFard}
     */
    const fard = await res.json();

    const populateFields = {
        district: fard.district,
        tehsil: fard.tehsil,
        place: fard.place,
        year: fard.year,
        purpose: PURPOSE_VALUE[fard.purpose],
        recordCenter: fard.recordCenter,
        fee: fard.fee,
        issuerFullName: `${fard.issuerFullName} ولد ${fard.issuerFatherName}`,
        issueDate: new Date(fard.issueDate).toLocaleString(),
        tokenDate: new Date(fard.tokenDate).toLocaleString(),
        token: fard.token,
        ownerNumber: fard.selectedOwners[0].ownerNumber.split("/")[0],
        nameFName: `${fard.fullName} ${
      fard.wife ? "زوجہ" : fard.daughter ? "دختر" : "ولد"
    } ${fard.fatherName}`,
        tribe: fard.tribe,
        cnic: fard.cnic.replaceAll("-", ""),
        areaShare: fard.selectedOwners[0].areaShare,
        jointShare: fard.selectedOwners[0].jointShare,
        areaShareTransferred: fard.selectedOwners[0].areaShareTransferred,
        jointShareTransferred: fard.selectedOwners[0].jointShareTransferred,
    };

    Object.keys(populateFields).forEach((key) => {
        document
            .getElementsByName(key)
            .forEach((tag) => (tag.innerText = populateFields[key]));
    });
}

var PURPOSE_VALUE = {
    ElectricityConnection: "فرد برائے بجلی کنکشن",
    PersonalRecord: "فرد برائے ذاتی ریکاڈ",
};