function getMockData() {
    Get("/fetch/getMockData").then(data => {
        console.log("mock data:", data);
    });
}

function getEsData() {
    Get("/fetch/getEsData").then(data => {
        console.log("es data:", data);
    });
}
