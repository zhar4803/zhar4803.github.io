document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.scrollVideo');
  
    function checkScroll() {
      videos.forEach(video => {
        const rect = video.getBoundingClientRect();
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
  
        if (isInViewport) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  
    // Check if the videos are in the viewport on page load
    checkScroll();
  
    // Add event listeners
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
  });
  



const unpack = (data, key) => data.map(row => row[key])



const chartconfig = {
    responsive: true
}

const sharedfont = "richmond-display"; //setting the font here because I'm specifying it in about 30 places so far and it'd be a huge pain to change otherwise.

// AHHH ROBS COMMENTS - JUST TESTING NARRATIVE IS CALM U CAN SEND OFF A DOC
// BUT ALSO DO MORE NARROW USABILITY TESTING OF SPECIFIC CHARTS
// PUT COMMENTS HERE WHERE YOU EXPLAIN HOW YOU PROCESSED THE DATA

// BEGIN KIA MODEL CHART

Plotly.d3.csv("EffectedKiaModels.csv", kia_data => {
    const year = unpack(kia_data, "year");

    let carArray = [
        "Accent",
        "Elantra",
        "Kona",
        "Santa Fe",
        "Tucson",
        "Veloster",
        "Forte",
        "Optima",
        "Rio",
        "Sedona",
        "Soul",
        "Sportage",
    ];

    let traces = [];

    carArray.forEach((car, index) => {
        let color;
        let brand;
        if (["Accent", "Elantra", "Kona", "Santa Fe", "Tucson", "Veloster"].includes(car)) {
            color = 'lime';
            brand = "Hyundai";
            rank = "1";
        } else {
            color = 'slategrey';
            brand = "Kia";
            rank = "1000";
        }

        let carTrace = {
            x: year,
            y: unpack(kia_data, car),
            legendgroup: brand,
            legendrank: rank,
            legendgrouptitle: {
                text: brand,
                font: {
                    family: sharedfont, size: 12,
                    color: 'white',
                },
            },
            name: car,
            line: {
                color: color,
                width: 0.8,
            },
            stackgroup: 'one',
            mode: "lines",
            hovertemplate: '<b>%{fullData.legendgroup}</b> %{fullData.name}<br>' +
                '<b>Year: </b>%{x}<br>' +
                '<b>Sales: </b>%{y:.2f%}<extra></extra>',
        };
        console.log(carTrace);
        traces.push(carTrace);
    });

    console.log(traces);

    let updateMenus = [
        {
            buttons: [
                {
                    args: ['mode', 'lines'],
                    label: 'lines',
                    method: 'restyle',
                },
                {
                    args: ['mode', 'markers'],
                    label: 'markers',
                    method: 'restyle',
                },
                {
                    args: ['mode', 'lines+markers'],
                    label: 'lines and markers',
                    method: 'restyle',
                },
            ],
            direction: 'left',
            pad: {
                'r': 200,
                't': 10,
            },
            showactive: true,
            type: 'buttons',
            x: 1,
            xanchor: 'middle',
            y: 1.2,
            yanchor: 'top',
        }
    ];

    var chartLayout = {
        // updatemenus: updateMenus,
        hovermode: 'closest',
        plot_bgcolor: 'rgba(255,255,255,0)',
        paper_bgcolor: 'rgba(255,255,255,0)',
        height: 600,
        margin: {
            t: 160,
            r: 180, // making the legend consistent with the previous chart
            // l: 160,  
        },
        images: [
            {
                "source": "KIA_logo3.png",
                "xref": "paper",
                "yref": "paper",
                "x": 0.2,
                "y": 0.6,
                "sizex": 0.1,
                "sizey": 0.1,
                "xanchor": "center",
                "yanchor": "center"
            },
            {
                "source": "Hyundai_Motor_Company_logo.png",
                "xref": "paper",
                "yref": "paper",
                "x": 0.2,
                "y": 0.3,
                "sizex": 0.2,
                "sizey": 0.2,
                "xanchor": "center",
                "yanchor": "center"
            },
        ],
        title: {
            xanchor: 'center',
            yanchor: 'center',

            pad: {
                b: 200,
            },
            text: 'Sales of affected Kia/Hyundai cars in the United States',
            font: {
                color: 'white',
                family: sharedfont, style: 'italic',
                size: 30,
            },
        },
        yaxis: {
            tickcolor: "white",
            tickwidth: 2,
            gridcolor: "teal",
            gridwidth: 1,
            zerolinecolor: "green",
            zerolinewidth: 2,
            tickfont: {
                family: sharedfont, size: 12,
                color: 'white',
            },

        },
        xaxis: {
            tickcolor: "white",
            // tickwidth: 2,
            gridcolor: "darkslategrey",
            gridwidth: 0.5,
            tickfont: {
                family: sharedfont, size: 14,
                color: 'white',
            },
            tickangle: 60,
            // ticklabelstep: 6,
            // dtick: 2,
            tick0: 1,
            tickmode: 'linear',
        },
        hoverlabel: {
            bgcolor: 'black',
            bordercolor: '#003166',
            font: {
                family: sharedfont, size: 14,
                color: 'white',
            },
        },
        showlegend: true,
        legend: {
            itemclick: false,
            groupclick: "toggleitem",
            itemwidth: 30,
            font: {
                family: sharedfont,
                size: 12,
                color: 'white',
            },
            tracegroupgap: 10, // Ensure there's space between groups
            traceorder: 'reversed',
            title: {
                font: {
                    family: sharedfont,
                    size: 16,
                    color: 'white',
                },
                text: 'Model',
            },
        },
        legendgrouptitle: {
            font: {
                family: sharedfont, size: 12,
                color: 'white',
            },
            // Specify text for each group
            text: {
                'Kia': 'Kia',
                'Hyundai': 'Hyundai',
            },
        },
        annotations: [
            {
                x: 2018,
                y: 0.5, // middle of the y-axis
                xref: 'x',
                yref: 'paper',
                xanchor: 'middle',
                yanchor: 'top',
                text: 'No longer covered by State Farm Insurance',
                showarrow: false,
                font: {
                    family: 'richmond-display',
                    size: 20,
                    color: 'white',
                    weight: 700,

                },
                // bgcolor: 'red',
                // opacity: 0.5,
                // width: 150,
                // height: 100,
            },
            // {
            //     x: 2013, // adjust this value as needed
            //     y: 0.2, // middle of the y-axis
            //     xref: 'x',
            //     yref: 'paper',
            //     xanchor: 'middle',
            //     yanchor: 'middle',
            //     text: 'Hyundai',
            //     showarrow: false,
            //     font: {
            //         family: 'richmond-display',
            //         size: 18,
            //         color: 'white',
            //         weight: 700,

            //     }
            // },
            // {
            //     x: 2022, // adjust this value as needed
            //     y: 0.7, // middle of the y-axis
            //     xref: 'x',
            //     yref: 'paper',
            //     xanchor: 'middle',
            //     yanchor: 'middle',
            //     text: 'Sportage',
            //     showarrow: false,
            //     font: {
            //         family: 'richmond-display',
            //         size: 14,
            //         color: 'white',
            //         weight: 700,
            //     }
            // }
        ],
        shapes: [
            {
                type: 'rect',
                xref: 'x',
                yref: 'paper',
                x0: 2015,
                y0: 0,
                x1: 2021,
                y1: 1, // Covers the full height of the plot
                fillcolor: 'red',
                opacity: 0.4,
                line: {
                    width: 0
                }
            }
        ]
    };

    var chartData = traces;

    Plotly.newPlot("salesChart", chartData, chartLayout);
});









// BEGIN KIA THEFT CHOROPLETH 
/*


Plotly.d3.csv("nicecleantable.csv", theft_data => {

    const states = unpack(theft_data, "State");
    const cities = unpack(theft_data, "City");
    const latitudes = unpack(theft_data, "Latitude");
    const longitudes = unpack(theft_data, "Longitude");

    let dateArray = [
        "December 2019", "January 2020", "February 2020", "March 2020", "April 2020", 
        "May 2020", "June 2020", "July 2020", "August 2020", "September 2020", 
        "October 2020", "November 2020", "December 2020", "January 2021", 
        "February 2021", "March 2021", "April 2021", "May 2021", "June 2021", 
        "July 2021", "August 2021", "September 2021", "October 2021", 
        "November 2021", "December 2021", "January 2022", "February 2022", 
        "March 2022", "April 2022", "May 2022", "June 2022", "July 2022", 
        "August 2022", "September 2022", "October 2022", "November 2022", 
        "December 2022", "January 2023", "February 2023", "March 2023", 
        "April 2023", "May 2023", "June 2023", "July 2023", "August 2023"
    ];

    const choroDates = {};
    dateArray.forEach(date => {
        choroDates[date] = unpack(theft_data, date);
    });

    var hoverTexts = [];
    states.forEach((state, i) => {
        hoverTexts.push(choroDates[dateArray[0]][i] === 0 ? 'No data available' : `${state}: ${choroDates[dateArray[0]][i]} thefts`);
    });

    var choroData = {
        type: "choropleth",
        locationmode: "USA-states",
        locations: states,
        z: choroDates[dateArray[0]],
        text: hoverTexts,
        hovertemplate: '%{text}<extra></extra>',
        colorscale: [
            [0, 'black'],
            [0.0001, 'darkslategray'],
            [1, 'lime'],
        ],
        zmin: 0,
        zmax: 1800,
        marker: {
            line: {
                color: 'rgb(180,180,180)',
                width: 0.8
            }
        },
        colorbar: {
            tickmode: "array",
            tickvals: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800],
            ticktext: ['0', '200', '400', '600', '800', '1000', '1200', '1400', '1600', '1800'],
            tickfont: {
                size: 10,
                color: 'white'
            },
        },
    };

    var scatterData = {
        type: 'scattergeo',
        mode: 'markers',
        lon: longitudes,
        lat: latitudes,
        text: cities,
        marker: {
            size: 8,
            color: 'red',
            opacity: 0.7,
            line: {
                width: 1,
                color: 'black'
            }
        },
        name: 'Theft Locations'
    };

    var sliderSteps = dateArray.map((date, i) => ({
        label: date,
        method: 'animate',
        args: [
            ['frame' + i],
            {
                mode: 'immediate',
                transition: { duration: 300,
                    easing: 'elastic-in'
                 },
                frame: { duration: 300, redraw: true }
            }
        ],
        value: date
    }));

    var choroLayout = {
        plot_bgcolor: 'darkslateblue',
        paper_bgcolor: 'rgba(255,255,255,0)',
        margin: {
            t: 160, 
        },
        dragmode: false, //I've decided to disable zooming because this choropleth is not really about looking at very fine details and it's really annoying when you zoom in on a corner or something.
        title: {
            text: 'Thefts of Kia/Hyundai Cars by State',
            font: { color: 'white',
            family: sharedfont,            style: 'italic',
            size: 30,
             },
             pad : {
                b: 200,
            },
        },
        height: 600,
        geo: {
            bgcolor: 'rgba(255,255,255,0)',
            showcountries: true,
            showframe: true,
            scope: 'usa',
        },
        sliders: [{
            active: 0,
            steps: sliderSteps,
            len: 0.9,
            x: 0.05,
            xanchor: 'left',
            y: 0,
            yanchor: 'top',
            font: { size: 10,
                color: 'white',
                        family: sharedfont, },
            pad: { t: 20, r: 10, b: 10 },
            currentvalue: {
                visible: true,
                prefix: 'Date: ',
                xanchor: 'right',
                font: { size: 20, 
                    color: 'white',
                    family: sharedfont,                }
            }
        }]
    };

    var frames = dateArray.map((date, i) => ({
        name: 'frame' + i,
        data: [
            {
                type: "choropleth",
                dragmode: "false",
                locationmode: "USA-states",
                locations: states,
                z: choroDates[date],
                text: states.map((state, j) => choroDates[date][j] === 0 ? 'No data available' : `${state}: ${choroDates[date][j]} thefts`),
                hovertemplate: '%{text}<extra></extra>',
                colorscale: [
                    [0, 'black'],
                    [0.0001, 'darkslategray'],
                    [1, 'lime'],
                ],
                zmin: 0,
                zmax: 1800,
                marker: {
                    line: {
                        color: 'rgb(180,180,180)',
                        width: 0.8
                    }
                },
                colorbar: {
                    tickmode: "array",
                    tickvals: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800],
                    ticktext: ['0', '200', '400', '600', '800', '1000', '1200', '1400', '1600', '1800'],
                    tickfont: {
                        size: 10,
                        color: 'white'
                    },
                },
            },
            scatterData // Include scatter data in each frame
        ]
    }));

    Plotly.newPlot("choropleth", [choroData, scatterData], choroLayout, { displayModeBar: false }).then(function() {
        Plotly.addFrames("choropleth", frames);
        var observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                animateChoropleth(13); // Start animation from frameIndex 13
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });

        observer.observe(document.getElementById("choropleth"));
    });

    var playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.style.position = 'relative';
    playButton.style.top = '-95px';
    playButton.style.left = '130px';
    playButton.style.zIndex = '1000';
    playButton.addEventListener('click', function() {
        animateChoropleth(0);
    });

    document.getElementById('choropleth').appendChild(playButton);

    var isPlaying = false;

    function animateChoropleth(startIndex) {
        if (!isPlaying) {
            isPlaying = true;
            var frameDuration = 300;
            var frameIndex = startIndex;
            var intervalId = setInterval(function() {
                Plotly.animate("choropleth", ['frame' + frameIndex], {
                    frame: { duration: frameDuration, redraw: true },
                    transition: { duration: frameDuration/2, 
                        easing: 'elastic-in' },
                    mode: "next"
                });
                frameIndex++;
                if (frameIndex >= dateArray.length) {
                    clearInterval(intervalId);
                    isPlaying = false;
                }
            }, frameDuration);
        }
    }

});


*/

Plotly.d3.csv("nicecleantable.csv", theft_data => {

    const states = unpack(theft_data, "State");
    const cities = unpack(theft_data, "City");
    const latitudes = unpack(theft_data, "Latitude");
    const longitudes = unpack(theft_data, "Longitude");

    let dateArray = [
        "December 2019", "January 2020", "February 2020", "March 2020", "April 2020",
        "May 2020", "June 2020", "July 2020", "August 2020", "September 2020",
        "October 2020", "November 2020", "December 2020", "January 2021",
        "February 2021", "March 2021", "April 2021", "May 2021", "June 2021",
        "July 2021", "August 2021", "September 2021", "October 2021",
        "November 2021", "December 2021", "January 2022", "February 2022",
        "March 2022", "April 2022", "May 2022", "June 2022", "July 2022",
        "August 2022", "September 2022", "October 2022", "November 2022",
        "December 2022", "January 2023", "February 2023", "March 2023",
        "April 2023", "May 2023", "June 2023", "July 2023", "August 2023"
    ];

    const choroDates = {};
    dateArray.forEach(date => {
        choroDates[date] = unpack(theft_data, date);
    });

    var hoverTexts = [];
    states.forEach((state, i) => {
        hoverTexts.push(choroDates[dateArray[0]][i] === 0 ? 'No data available' : `${state}: ${choroDates[dateArray[0]][i]} thefts`);
    });

    var choroData = {
        type: "choropleth",
        locationmode: "USA-states",
        locations: states,
        z: choroDates[dateArray[0]],
        text: hoverTexts,
        hovertemplate: '%{text}<extra></extra>',
        colorscale: [
            [0, 'black'],
            [0.0001, 'darkslategray'],
            [1, 'lime'],
        ],
        zmin: 0,
        zmax: 1800,
        marker: {
            line: {
                color: 'rgb(180,180,180)',
                width: 0.8
            }
        },
        colorbar: {
            tickmode: "array",
            tickvals: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800],
            ticktext: ['0', '200', '400', '600', '800', '1000', '1200', '1400', '1600', '1800'],
            tickfont: {
                size: 10,
                color: 'white'
            },
        },
    };

    var scatterData = {
        type: 'scattergeo',
        mode: 'markers',
        lon: longitudes,
        lat: latitudes,
        text: cities,
        marker: {
            size: 8,
            color: 'red',
            opacity: 0.7,
            line: {
                width: 1,
                color: 'black'
            }
        },
        name: 'Theft Locations'
    };

    var sliderSteps = dateArray.map((date, i) => ({
        label: date,
        method: 'animate',
        args: [
            ['frame' + i],
            {
                mode: 'immediate',
                transition: { duration: 300, easing: 'elastic-in' },
                frame: { duration: 300, redraw: true }
            }
        ],
        value: date
    }));

    var choroLayout = {
        plot_bgcolor: 'darkslateblue',
        paper_bgcolor: 'rgba(255,255,255,0)',
        margin: {
            t: 160,
            r: 140,
            l: 140,
        },
        dragmode: false, // Disable zooming
        title: {
            text: 'Thefts of Kia/Hyundai Cars by State',
            font: {
                color: 'white',
                family: sharedfont,
                style: 'italic',
                size: 30,
            },
            pad: {
                b: 200,
            },
        },
        height: 600,
        geo: {
            bgcolor: 'rgba(255,255,255,0)',
            showcountries: true,
            showframe: true,
            scope: 'usa',
        },
        sliders: [{
            active: 0,
            steps: sliderSteps,
            len: 0.9,
            x: 0.05,
            xanchor: 'left',
            y: 0,
            yanchor: 'top',
            font: {
                size: 10,
                color: 'white',
                family: sharedfont,
            },
            pad: { t: 20, r: 10, b: 10 },
            currentvalue: {
                visible: true,
                prefix: 'Date: ',
                xanchor: 'right',
                font: {
                    size: 20,
                    color: 'white',
                    family: sharedfont,
                }
            }
        }]
    };

    var frames = dateArray.map((date, i) => ({
        name: 'frame' + i,
        data: [
            {
                type: "choropleth",
                locationmode: "USA-states",
                locations: states,
                z: choroDates[date],
                text: states.map((state, j) => choroDates[date][j] === 0 ? 'No data available' : `${state}: ${choroDates[date][j]} thefts`),
                hovertemplate: '%{text}<extra></extra>',
                colorscale: [
                    [0, 'black'],
                    [0.0001, 'darkslategray'],
                    [1, 'lime'],
                ],
                zmin: 0,
                zmax: 1800,
                marker: {
                    line: {
                        color: 'rgb(180,180,180)',
                        width: 0.8
                    }
                },
                colorbar: {
                    tickmode: "array",
                    tickvals: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800],
                    ticktext: ['0', '200', '400', '600', '800', '1000', '1200', '1400', '1600', '1800'],
                    tickfont: {
                        size: 10,
                        color: 'white'
                    },
                },
            },
            {
                type: 'scattergeo',
                mode: 'markers',
                lon: longitudes,
                lat: latitudes,
                text: cities,
                marker: {
                    size: 8,
                    color: 'red',
                    opacity: 0.7,
                    line: {
                        width: 1,
                        color: 'black'
                    }
                },
                name: 'Theft Locations'
            }
        ]
    }));

    Plotly.newPlot("choropleth", [choroData, scatterData], choroLayout, { displayModeBar: false }).then(function () {
        Plotly.addFrames("choropleth", frames);
        var observer = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                animateChoropleth(13); // Start animation from frameIndex 13
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });

        observer.observe(document.getElementById("choropleth"));
    });

    var playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.style.position = 'relative';
    playButton.style.top = '-95px';
    playButton.style.left = '130px';
    playButton.style.zIndex = '1000';
    playButton.addEventListener('click', function () {
        animateChoropleth(0);
    });

    document.getElementById('choropleth').appendChild(playButton);

    var isPlaying = false;

    function animateChoropleth(startIndex) {
        if (!isPlaying) {
            isPlaying = true;
            var frameDuration = 300;
            var frameIndex = startIndex;
            var intervalId = setInterval(function () {
                Plotly.animate("choropleth", ['frame' + frameIndex], {
                    frame: { duration: frameDuration, redraw: true },
                    transition: { duration: frameDuration / 2, easing: 'elastic-in' },
                    mode: "next"
                });
                frameIndex++;
                if (frameIndex >= dateArray.length) {
                    clearInterval(intervalId);
                    isPlaying = false;
                }
            }, frameDuration);
        }
    }

});







// BEGIN KIA THEFT CHART

Plotly.d3.csv("transposedSheet.csv", transposed_data => {


    const date = unpack(transposed_data, "Date");

    let cityArray = ["Boise, ID",
        "Oxnard, CA",
        "Corpus Cristi, TX",
        "McKinney, TX",
        "Eugene, OR",
        "Peoria, AZ",
        "Amarillo, TX",
        "Chandler, AZ",
        "Reno, NV",
        "Plano, TX",
        "Aurora, IL",
        "Modesto, CA",
        "Newport News, VA",
        "Providence, RI",
        "Garland, TX",
        "Madison, WI",
        "Fremont, CA",
        "Pittsburgh, PA",
        "Irving, TX",
        "Arlington, TX",
        "Spokane, WA",
        "Salt Lake City, UT",
        "Lubbock, TX",
        "Raleigh, NC",
        "Virginia Beach",
        "Wichita, KS",
        "St. Petersburg, FL",
        "Akron, OH",
        "Chula Vista, CA",
        "Orlando, FL",
        "El Paso",
        "Syracuse, NY",
        "Tuscon",
        "Stockton, CA",
        "San Bernardino, CA",
        "Vancouver, WA",
        "Montgomery County, MD",
        "Henderson, NV",
        "Anaheim, CA",
        "Glendale, AZ",
        "Dayton",
        "Bakersfield",
        "New Haven, CT",
        "Durham, NC",
        "Sacramento",
        "Riverside County, CA",
        "Seattle",
        "San Francisco",
        "Baltimore",
        "San Jose, CA",
        "San Diego",
        "Washington",
        "Buffalo, NY",
        "Rochester, NY",
        "Omaha",
        "Cleveland",
        "Austin, TX",
        "Cincinatti",
        "Albuquerque",
        "Atlanta",
        "Portland",
        "Washington, D.C.",
        "Dallas",
        "Louisville",
        "Minneapolis, MN",
        "Denver",
        "Los Angeles",
        "Milwaukee, WI",
        "Chicago"]


    let traces = []


    // Define the start and end colors in RGB format
    const startColor = [25, 49, 49, 2]; // darkslategrey
    const endColor = [0, 255, 0, 2]; // lime

    const startColorLine = [40, 79, 79, 0.5]; // darkslategrey
    const endColorLine = [0, 255, 0, 0.5]; // lime


    // Function to interpolate between two colors
    function interpolateColor(color1, color2, factor) {
        // Use a quadratic function to make the color change more dramatically towards the end
        factor = Math.pow(factor, 15);
        // Interpolate each RGB component
        const r = Math.round(color1[0] + (color2[0] - color1[0]) * factor);
        const g = Math.round(color1[1] + (color2[1] - color1[1]) * factor);
        const b = Math.round(color1[2] + (color2[2] - color1[2]) * factor);
        return [r, g, b];
    }

    // Rob really came through and helped write this function that goes through every entry in the city array and generates a trace

    cityArray.forEach((city, index) => {

        const intermediateColor = interpolateColor(startColor, endColor, index / cityArray.length);
        const intermediateColorLine = interpolateColor(startColorLine, endColorLine, index / cityArray.length);



        let cityTrace = {
            x: date,
            y: unpack(transposed_data, city),
            name: city,
            customdata: 'city',
            fillcolor: `rgb(${intermediateColor.join(',')})`,
            line: {
                color: `rgb(${intermediateColorLine.join(',')})`,
                width: 0.8,

            },
            stackgroup: 'one',
            mode: "lines",
            hovertemplate: '<b>%{fullData.name}</b><br>' +
                '<b>Month: </b>%{x}<br>' +
                '<b>Kia Thefts: </b>%{y:.2f%}<extra></extra>',
        }
        console.log(cityTrace)
        traces.push(cityTrace)
    })

    console.log(traces)


    // let updateMenus = [
    //     {
    //         buttons: [
    //             {
    //                 args: ['mode', 'lines'],
    //                 label: 'lines',
    //                 method: 'restyle',
    //             },
    //             {
    //                 args: ['mode', 'markers'],
    //                 label: 'markers',
    //                 method: 'restyle',
    //             },
    //             {
    //                 args: ['mode', 'lines+markers'],
    //                 label: 'lines and markers',
    //                 method: 'restyle',
    //             },

    //         ],
    //         direction: 'left',
    //         pad: {
    //             'r': 200,
    //             't': 10,
    //         },
    //         showactive: true,
    //         type: 'buttons',
    //         x: 1,
    //         xanchor: 'middle',
    //         y: 1.2,
    //         yanchor: 'top',

    //     }
    // ]

    var chartLayout = {
        // updatemenus: updateMenus,
        hovermode: 'closest',
        plot_bgcolor: 'rgba(255,255,255,0)',
        paper_bgcolor: 'rgba(255,255,255,0)',
        height: 600,
        margin: {
            t: 140,
            r: 180,
        },
        title: {
            text: 'Thefts of Kia/Hyundai Cars in the United States, 2020-2023',
            font: {
                color: 'white',
                family: sharedfont, style: 'italic',
                size: 30,
            },
            pad: {
                b: 200,
            },
        },
        yaxis: {
            "tickcolor": "white",
            "tickwidth": 2,

            "gridcolor": "teal",
            gridwidth: 1,

            zerolinecolor: "green",
            zerolinewidth: 2,
            tickfont: {

                family: sharedfont, size: 12,
                color: 'white',

            },
        },
        xaxis: {
            tickcolor: "white",
            // "tickwidth": 2,

            gridcolor: "darkslategrey",
            gridwidth: 0.5,

            tickfont: {

                family: sharedfont, size: 12,
                color: 'white',

            },
            tickangle: 60,
            // ticklabelstep: 6,
            dtick: 2,
            tick0: 1,
            tickmode: 'linear',
        },
        hoverlabel: {
            bgcolor: 'black',
            bordercolor: '#003166',
            font: {
                family: sharedfont, size: 12,
                color: 'white',
            }
        },
        legend: {
            itemclick: false,
            title: {
                font: {

                    family: sharedfont,
                    size: 14,
                    color: 'white',
                    weight: 'bold'
                },
                text: 'City',
                side: 'top center',
            },
            itemwidth: 2,
            font: {
                family: sharedfont,
                size: 12,
                color: 'white',
            }
        },
        annotations: [
            {
                x: 'December 2022',
                y: 0.74, // Adjust this value according to your y-axis range
                xref: 'x',
                yref: 'paper',
                text: 'Chicago',
                showarrow: false,
                font: {
                    family: sharedfont,
                    size: 16,
                    color: 'white',
                }
            },
            {
                x: 'July 2021',
                y: 0.17, // Adjust this value according to your y-axis range
                xref: 'x',
                yref: 'paper',
                text: 'Milwaukee, WI',
                showarrow: false,
                font: {
                    family: sharedfont,
                    size: 16,
                    color: 'white',
                }
            },
            {
                x: 'March 2022',
                y: 0.145, // Adjust this value according to your y-axis range
                xref: 'x',
                yref: 'paper',
                text: 'Los Angeles',
                showarrow: false,
                font: {
                    family: sharedfont,
                    size: 16,
                    color: 'white',
                }
            }
        ]

    }

    var chartData = traces;

    Plotly.newPlot("theftChart", chartData, chartLayout, chartconfig);



})

// BEGIN ARREST CHART



Plotly.d3.csv("arrests.csv", arrest_data => {
    const year = unpack(arrest_data, "Year");

    let ageArray = [
        "Under 10",
        "10 to 12",
        "13 to 14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25 to 29",
        "30 to 34",
        "35 to 39",
        "40 to 44",
        "45 to 49",
        "50 to 54",
        "55 to 59",
        "60 to 64",
        "65 and over",
    ];

    function createTraces(normalize = false) {
        let traces = ageArray.map((age, index) => {
            let color;
            let width;
            let mode;
            let marker = {
                size: 8,
                color: 'lime', // Default color for the markers
                line: {
                    color: 'white',
                    width: 4
                },
                symbol: [],  // Custom marker symbols
                opacity: [], // Custom marker opacity
            };

            if (["Under 10", "10 to 12", "13 to 14", "15", "16", "17"].includes(age)) {
                color = 'lime';
                width = 0.8;
                mode = 'lines';

            } else if (["18"].includes(age)) {
                color = 'lime';
                width = 4;
                mode = 'lines+markers';

                // Initialize marker properties for each data point
                year.forEach((_, i) => {
                    if (i === 0 || i === 4) { // 7th and 10th tick (0-based index)
                        marker.symbol.push('square');
                        marker.opacity.push(1);
                        marker.color = '#FFFFFF'; // White color for the markers
                    } else {
                        marker.symbol.push('diamond-wide-open-dot');
                        marker.opacity.push(0);
                    }
                });
            } else {
                color = 'slategrey';
                width = 0.8;
                mode = 'lines';
            }

            let yData = unpack(arrest_data, age);

            if (normalize) {
                const yearlySums = year.map((_, i) =>
                    ageArray.reduce((sum, age) => sum + parseFloat(arrest_data[i][age]), 0)
                );
                yData = yData.map((y, i) => y / yearlySums[i]);
            }

            return {
                x: year,
                y: yData,
                name: age,
                mode: mode,
                line: {
                    color: color,
                    width: width,
                },
                marker: marker,
                stackgroup: 'one',
                hovertemplate: '<b>Age: %{fullData.name}</b><br>' +
                    '<b>Year: </b>%{x}<br>' +
                    '<b>Arrests: </b>%{y:.2f%}<extra></extra>',
            };
        });

        return traces;
    }

    let traces = createTraces();
    let traces100 = createTraces(true);

    let updateMenus = [
        {
            buttons: [
                {
                    args: [{ 'y': traces.map(t => t.y) }],
                    label: 'Arrests (Stacked)',
                    method: 'restyle',
                    bgcolor: 'darkslategrey',
                    font: {
                        color: 'black',
                        family: sharedfont,
                        size: 14
                    },
                },
                {
                    args: [{ 'y': traces100.map(t => t.y) }],
                    label: 'Arrests (Distribution)',
                    method: 'restyle',
                    font: {
                        color: 'black',
                        family: sharedfont,
                        size: 14
                    },
                },
            ],
            direction: 'left',
            pad: { 'r': 10, 't': 10 },
            showactive: true,
            type: 'buttons',
            x: 0.05,
            xanchor: 'left',
            y: 1.0,
            yanchor: 'top',
            font: {
                color: 'black',
                family: sharedfont,
                size: 16
            },
            bgcolor: 'slategrey',
            bordercolor: 'white',
            borderwidth: 1
        }
    ];

    var chartLayout = {
        updatemenus: updateMenus,
        hovermode: 'closest',
        plot_bgcolor: 'rgba(255,255,255,0)',
        paper_bgcolor: 'rgba(255,255,255,0)',
        height: 600,
        margin: {
            t: 140,
            l: 120,
            r: 120,
        },
        title: {
            text: 'Arrests for Car Theft in Wisconsin by age group, 2012-2022',
            font: {
                color: 'white',
                family: sharedfont,
                style: 'italic',
                size: 30,
            },
            pad: {
                b: 20,
            },
        },
        yaxis: {
            tickcolor: "white",
            tickwidth: 2,
            gridcolor: "teal",
            gridwidth: 1,
            zerolinecolor: "green",
            zerolinewidth: 2,
            tickmode: 'auto',  // Change tickmode to 'linear'
            nticks: 10,  // Specify the number of ticks
            tickfont: {
                family: sharedfont,
                size: 12,
                color: 'white',
            },
        },

        xaxis: {
            tickcolor: "white",
            gridcolor: "darkslategrey",
            gridwidth: 0.5,
            tickfont: {
                family: sharedfont,
                size: 14,
                color: 'white',
            },
            tickangle: 60,
            tickmode: 'linear',
        },
        hoverlabel: {
            bgcolor: 'black',
            bordercolor: '#003166',
            font: {
                family: sharedfont,
                size: 14,
                color: 'white',
            },
        },
        showlegend: false,
        legend: {
            groupclick: "toggleitem",
            itemwidth: 30,
            font: {
                family: sharedfont,
                size: 10,
                color: 'white',
            },
            tracegroupgap: 10,
            traceorder: 'reversed',
            title: {
                font: {
                    family: sharedfont,
                    size: 16,
                    color: 'white',
                },
                text: 'Age',
            },
        },
        annotations: [
            {
                x: 2017,
                y: 0.2,
                xref: 'x',
                yref: 'paper',
                xanchor: 'middle',
                yanchor: 'top',
                text: 'Under 18',
                showarrow: false,
                font: {
                    family: sharedfont,
                    size: 20,
                    color: 'white',
                    weight: 700,
                },
            },
            {
                x: 2017,
                y: 0.7,
                xref: 'x',
                yref: 'paper',
                xanchor: 'middle',
                yanchor: 'top',
                text: 'Over 18',
                showarrow: false,
                font: {
                    family: sharedfont,
                    size: 20,
                    color: 'white',
                    weight: 700,
                },
            },
            {
                x: 2018,
                y: 0.55,
                xref: 'x',
                yref: 'paper',
                xanchor: 'middle',
                yanchor: 'top',
                text: '501 Arrests<br>43% of Total.',
                showarrow: false,
                font: {
                    family: sharedfont,
                    size: 14,
                    color: 'white',
                    weight: 700,
                },
            },
            {
                x: 2020.9,
                y: 0.6,
                xref: 'x',
                yref: 'paper',
                xanchor: 'left',
                yanchor: 'top',
                text: '570 Arrests<br>50% of total<br>                                    ',
                showarrow: false,
                font: {
                    family: sharedfont,
                    size: 14,
                    color: 'white',
                    weight: 700,
                },
            },
        ],
    };

    Plotly.newPlot("arrestChart", traces, chartLayout, { responsive: true });
});






// BEGIN KIA SEARCH TERM CHART


Plotly.d3.csv("KiaSearches.csv", search_data => {




    const challenge = unpack(search_data, "Kia Challenge");
    const boyz = unpack(search_data, "Kia Boyz");
    const theft = unpack(search_data, "Kia theft");
    const steal = unpack(search_data, "How to Steal Kia");
    const usb = unpack(search_data, "Kia USB");
    const week = unpack(search_data, "Week");

    var trace1 = {
        x: week,
        y: challenge,
        name: "Kia Challenge",
        mode: "lines",
        fill: 'tozeroy',
        zorder: '1',
        hovertemplate: 'Searches for "Kia Challenge"' +
            '<b>Week: </b>%{x}<br>' +
            '<b>Search interest (%): </b>%{y:.2f%}%<extra></extra>',
    }


    var trace2 = {
        x: week,
        y: boyz,
        name: "Kia Boyz",
        mode: "lines",
        fill: 'none',
        line: {
            dash: 'dashdot',
        },
        opacity: 0.5,
        zorder: '-1',
        hovertemplate: 'Searches for "Kia Boyz"' +
            '<b>Week: </b>%{x}<br>' +
            '<b>Search interest (%): </b>%{y:.2f%}%<extra></extra>',
    }

    var trace3 = {
        x: week,
        y: theft,
        name: "Kia Theft",
        mode: "lines",
        fill: 'tozeroy',
        zorder: 100,
        hovertemplate: 'Searches for "Kia Theft"' +
            '<b>Week: </b>%{x}<br>' +
            '<b>Search interest (%): </b>%{y:.2f%}%<extra></extra>',
    }

    var trace4 = {
        x: week,
        y: steal,
        name: "How to Steal Kia",
        mode: "lines",
        fill: 'none',
        opacity: 0.5,
        zorder: -1,
        line: {
            dash: 'dashdot',
        },
        hovertemplate: 'Searches for "How to Steal Kia"' +
            '<b>Week: </b>%{x}<br>' +
            '<b>Search interest (%): </b>%{y:.2f%}%<extra></extra>',
    }

    var trace5 = {
        x: week,
        y: usb,
        name: "Kia USB",
        mode: "lines",
        fill: 'none',
        opacity: 0.5,
        zorder: -1,
        line: {
            dash: 'dashdot',
        },
        hovertemplate: 'Searches for "Kia USB"' +
            '<b>Week: </b>%{x}<br>' +
            '<b>Search interest (%): </b>%{y:.2f%}%<extra></extra>',
    }



    var layout = {
        hovermode: 'closest',
        plot_bgcolor: 'rgba(255,255,255,0)',
        paper_bgcolor: 'rgba(255,255,255,0)',
        height: 600,
        margin: {
            t: 140,
        },
        title: {
            text: 'Google Trend data for "Kia Challenge"-related search terms',
            font: {
                color: 'white',
                family: sharedfont,
                style: 'italic',
                size: 30,
            },
            pad: {
                b: 200,
            },
        },
        yaxis: {
            tickcolor: "white",
            tickwidth: 2,
            gridcolor: "teal",
            gridwidth: 1,
            zerolinecolor: "green",
            zerolinewidth: 2,
            tickfont: {
                family: sharedfont,
                size: 12,
                color: 'white',
            },
        },
        xaxis: {
            tickcolor: "white",
            gridcolor: "darkslategrey",
            gridwidth: 0.5,
            tickfont: {
                family: sharedfont,
                size: 12,
                color: 'white',
            },
            tickangle: 60,
            dtick: 30,
            tick0: 0,
            tickmode: 'auto',
        },
        hoverlabel: {
            bgcolor: 'black',
            bordercolor: '#003166',
            font: {
                family: sharedfont,
                size: 14,
                color: 'white',
            },
        },
        showlegend: true,
        legend: {
            groupclick: "toggleitem",
            itemwidth: 30,
            font: {
                family: sharedfont,
                size: 10,
                color: 'white',
            },
            tracegroupgap: 10,
            traceorder: 'reversed',
            title: {
                font: {
                    family: sharedfont,
                    size: 16,
                    color: 'white',
                },
                text: 'Age',
            },
        },
        annotations: [
            {
                x: '2022-10-22',
                y: 90,
                xref: 'x',
                yref: 'y',
                xanchor: 'right',
                yanchor: 'bottom',
                text: 'October 10 2022:<br>Death of four in accident',
                showarrow: false,
                arrowcolor: 'white',
                arrowhead: 1,
                arrowsize: 1,
                arrowpath: 'M -10,-50 Q -20,-75 -30,-50',
                ax: 50,
                ay: 0,
                font: {
                    family: sharedfont,
                    size: 14,
                    color: 'white',
                    weight: 700,
                },
            },
            {
                x: '2022-07-24',
                y: 65,
                xref: 'x',
                yref: 'y',
                xanchor: 'right',
                yanchor: 'bottom',
                text: 'July 07 2022:<br>Viral spread of Tiktok',
                showarrow: false,
                arrowcolor: 'white',
                arrowhead: 1,
                arrowsize: 1,
                ax: -50,
                ay: 0,
                font: {
                    family: sharedfont,
                    size: 14,
                    color: 'white',
                    weight: 700,
                },
            },
            {
                x: '2024-02-25',
                y: 25,
                xref: 'x',
                yref: 'y',
                xanchor: 'right',
                yanchor: 'bottom',
                text: 'March 3 2024:<br>Milwaukee lawsuit settlement',
                showarrow: false,
                arrowcolor: 'white',
                arrowhead: 1,
                arrowsize: 1,
                ax: -50,
                ay: 0,
                font: {
                    family: sharedfont,
                    size: 14,
                    color: 'white',
                    weight: 700,
                },
            },
        ],
    }



    var data = [trace3, trace1, trace2, trace4, trace5]

    Plotly.newPlot("trendChart", data, layout, chartconfig)
})

// BEGIN SEA SHANTY SEARCH TERM CHART

Plotly.d3.csv("ShantySearches.csv", shanty_data => {
    const shanty = unpack(shanty_data, "Sea Shanty");
    const wellerman = unpack(shanty_data, "Wellerman");
    const week = unpack(shanty_data, "Week");

    var trace2 = {
        x: week,
        y: shanty,
        name: "Sea Shanty",
        type: 'scatter',
        mode: "lines",
        fill: 'tozeroy',
        hovertemplate: 'Searches for "Sea Shanty"<br>' +
            '<b>Week: </b>%{x}<br>' +
            '<b>Search interest (%): </b>%{y:.2f%}%<extra></extra>',
    }

    var trace1 = {
        x: week,
        y: wellerman,
        name: "Wellerman",
        type: 'scatter',
        fill: 'tozeroy',
        mode: 'lines',
        hovertemplate: 'Searches for "Wellerman"<br>' +
            '<b>Week: </b>%{x}<br>' +
            '<b>Search interest (%): </b>%{y:.2f%}%<extra></extra>',
    }

    let updateMenus = [
        {
            buttons: [
                {
                    args: ['mode', 'lines'],
                    label: 'lines',
                    method: 'restyle',
                },
                {
                    args: ['mode', 'markers'],
                    label: 'markers',
                    method: 'restyle',
                },
                {
                    args: ['mode', 'lines+markers'],
                    label: 'lines and markers',
                    method: 'restyle',
                },

            ],
            direction: 'left',
            pad: {
                'r': 200,
                't': 10,
            },
            showactive: true,
            type: 'buttons',
            x: 1,
            xanchor: 'middle',
            y: 1.2,
            yanchor: 'top',
        }
    ]

    var layout = {
        hovermode: 'closest',
        plot_bgcolor: 'rgba(255,255,255,0)',
        paper_bgcolor: 'rgba(255,255,255,0)',
        height: 600,
        margin: {
            t: 140,
        },
        title: {
            text: 'Google Trend data for "Sea Shanty"-related search terms',
            font: {
                color: 'white',
                family: sharedfont,
                style: 'italic',
                size: 30,
            },
            pad: {
                b: 50,
                t: 50,
            },
            xanchor: 'center',
            yanchor: 'top',
        },
        yaxis: {
            tickcolor: "white",
            tickwidth: 2,
            gridcolor: "teal",
            gridwidth: 1,
            zerolinecolor: "green",
            zerolinewidth: 2,
            tickfont: {
                family: sharedfont,
                size: 12,
                color: 'white',
            },
        },
        xaxis: {
            tickcolor: "white",
            gridcolor: "darkslategrey",
            gridwidth: 0.5,
            tickfont: {
                family: sharedfont,
                size: 12,
                color: 'white',
            },
            tickangle: 60,
            dtick: 30,
            tick0: 0,
            tickmode: 'auto',
        },
        hoverlabel: {
            bgcolor: 'black',
            bordercolor: '#003166',
            font: {
                family: sharedfont,
                size: 14,
                color: 'white',
            },
        },
        showlegend: true,
        legend: {
            groupclick: "toggleitem",
            itemwidth: 30,
            font: {
                family: sharedfont,
                size: 10,
                color: 'white',
            },
            tracegroupgap: 10,
            traceorder: 'reversed',
            title: {
                font: {
                    family: sharedfont,
                    size: 16,
                    color: 'white',
                },
                text: 'Age',
            },
        },
        annotations: [
            {
                x: '2020-07-26',
                y: 75,
                xref: 'x',
                yref: 'y',
                xanchor: 'middle',
                yanchor: 'bottom',
                showarrow: false,
                text: 'January 17 2021:<br>Viral spread of initial<br>"Wellerman" Tiktok',
                font: {
                    family: sharedfont,
                    size: 14,
                    color: 'white',
                    weight: 700,
                },
            },
            {
                x: '2022-11-06',
                y: 45,
                xref: 'x',
                yref: 'y',
                xanchor: 'middle',
                yanchor: 'bottom',
                showarrow: false,
                text: 'June 05 2022:<br>Several Sea Shanty<br>festivals are held',
                font: {
                    family: sharedfont,
                    size: 14,
                    color: 'white',
                    weight: 700,
                },
            },
            {
                x: '2020-01-10',
                y: 20,
                xref: 'x',
                yref: 'y',
                xanchor: 'middle',
                yanchor: 'bottom',
                showarrow: false,
                text: 'July 2019:<br>Spread of Sea Shanty<br> content on Tiktok',
                font: {
                    family: sharedfont,
                    size: 14,
                    color: 'white',
                    weight: 700,
                },
            },
        ],
    }

    var data = [trace2, trace1]

    Plotly.newPlot("shantyChart", data, layout, chartconfig)
})
