async function populateFard() {

    const id = new URLSearchParams(window.location.search).get("id");

    const res = await fetch(`data/${id}.json`);

    if (!res.ok) {
        document.body.innerHTML = "<h2>Record Not Found</h2>";
        return;
    }

    const fard = await res.json();

    const PURPOSE_VALUE = {
        ElectricityConnection: "فرد برائے بجلی کنکشن",
        PersonalRecord: "فرد برائے ذاتی ریکاڈ",
    };

    const data = {
        district: fard.district,
        tehsil: fard.tehsil,
        place: fard.place,
        year: fard.year,
        purpose: PURPOSE_VALUE[fard.purpose],
        recordCenter: fard.recordCenter,
        fee: fard.fee,
        issuerFullName: `${fard.issuerFullName} ولد ${fard.issuerFatherName}`,
        issueDate: new Date(fard.issueDate).toLocaleString(),
        token: fard.token,
        nameFName: `${fard.fullName} ${fard.fatherName}`,
        tribe: fard.tribe,
        cnic: fard.cnic
    };

    Object.keys(data).forEach(key => {
        document.getElementsByName(key)
        .forEach(el => el.innerText = data[key] || "-");
    });
}

document.addEventListener("DOMContentLoaded", populateFard);