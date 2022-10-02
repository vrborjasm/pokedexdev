const ctx = document.getElementById('stats').getContext('2d');

export function createChart(stats, name) {
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'HP',
                'Attack',
                'Defense',
                'Sp. Atack',
                'Sp. Defense',
                'Speed',
              ],
              datasets: [{
                data: stats,
                backgroundColor: 'rgba(0, 32, 255, 0.75)'
              }]
        },
        options: {
            responsive: true,
            maintenAspectRatio: false,
            plugins:{
                legend: {
                    display: false,
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'white'
                    },
                    pointLabels: {
                        color: 'white'
                    },
                    angleLines: {
                        color: 'white'
                    }
                }
            }
          }
    });
}