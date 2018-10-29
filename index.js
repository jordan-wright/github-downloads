const GITHUB_API_URL = "https://api.github.com/repos"

const drawChart = (username, repo) => {
    const releaseURL = `${GITHUB_API_URL}/${username}/${repo}/releases`;
    fetch(releaseURL)
        .then(response => response.json())
        .then(releases => {
            console.log(releases)
            google.charts.load("current", {
                packages: ["bar"],
                callback: () => {
                    let chartData = [
                        ["Binary", "Download Count"]
                    ];
                    releases.map(release => {
                        release.assets.map(asset => {
                            chartData.push([asset.name, asset.download_count])
                        })
                    })
                    const options = {
                        chart: {
                            title: 'Release Statistics',
                        },
                        bars: 'horizontal'
                    }
                    const chart = new google.charts.Bar(document.getElementById("releases_chart"))
                    chart.draw(google.visualization.arrayToDataTable(chartData), google.charts.Bar.convertOptions(options))
                }
            })
        }).catch(e => {
            console.log(e)
        })

}
window.onload = () => {
    if (window.location.hash) {
        const hash = window.location.hash.substring(1).split("/");
        const username = hash[0]
        const repo = hash[1]
        drawChart(username, repo)
    }

    document.getElementById("releaseForm").addEventListener("submit", (e) => {
        console.log("SUBMIT")
        let username = document.getElementById("username").value
        let repo = document.getElementById("repo").value
        drawChart(username, repo)
        e.preventDefault()
    })
}