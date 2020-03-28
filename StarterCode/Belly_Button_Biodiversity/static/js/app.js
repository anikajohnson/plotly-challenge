
// Stub - test to confirm that you called it
function DrawBargraph(sampleId)
{
    // name of function and parameter called
    console.log(`Calling DrawBargraph(${sampleId})`);
    
    // call data
    d3.json("samples.json").then((data) => {
        // define data
        var samples = data.samples;
        // filter data to match sampleId
        var resultArray = samples.filter(s => s.id == sampleId);
        // take first result
        var result = resultArray[0];
        // get variables
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Slice the first 10 otu ids, covert to string and reverse array
        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        //set bar data
        var barData = {
            // Slice the first 10 sample values and reverse array
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
             // Slice the first 10 otu labels and reverse array
            text: otu_labels.slice(0, 10).reverse(),
            // horizontal orientation
            orientation: "h"
        };

        var barArray = [barData];

        // set bar layout
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150,}
        };

        // creat barplot
        Plotly.newPlot("bar", barArray, barLayout);

    });
}

// Stub - test to confirm that you called it
function DrawBubblechart(sampleId)
{
    // name of function and parameter called
    console.log(`Calling DrawBubblechart(${sampleId})`);

    // call data
    d3.json("samples.json").then((data) => {

        // define data
        var samples = data.samples;
        // filter data to match sampleId
        var resultArray = samples.filter(s => s.id == sampleId);
        // take first result
        var result = resultArray[0];
        // get variables
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;


        //set bubble data
        var bubbleData = {
            // * Use `otu_ids` for the x values.
            x: otu_ids,
            // * Use `sample_values` for the y values.
            y: sample_values,
            // * Use `otu_labels` for the text values.
            text: otu_labels,

            mode: 'markers',
            marker: {
                // * Use `otu_ids` for the marker colors.
                color: otu_ids,
                // * Use `sample_values` for the marker size.
                size: sample_values
            }
        };

        var bubbleArray = [bubbleData];

        // set bubble layout
        var bubbleLayout = {
            title: "Samples",
            showlegend: false,
            height: 500,
            width: 1000,
        };

        // creat bubbleplot
        Plotly.newPlot('bubble', bubbleArray, bubbleLayout);

    });

}

// Stub - test to confirm that you called it
function ShowMetadata(sampleId)
{
    // name of function and parameter called
    console.log(`Calling ShowMetadata(${sampleId})`);

     // call data
    d3.json("samples.json").then((data) => {


        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray[0];

        var PANEL = d3.select("#sample-metadata");
        // clear old metadata
        PANEL.html("");

        Object.entries(result).forEach(([key, value]) => {
            // flesh out with html f string
            var textToShow = `${key}:  ${value}` ;

            PANEL.append("h6").text(textToShow);
        });
    });
}

// Eventhandler Stub
function optionChanged(newSampleId)
{
    // test if eventhandler is working
    console.log(`User selected ${newSampleId}`)

    // call functions 
    DrawBubblechart(newSampleId);
    DrawBargraph(newSampleId);
    ShowMetadata(newSampleId);
}


function InitDashboard()
{
    console.log("Initializing Dashboard");

    // find selector
    var selector = d3.select("#selDataset");

    // populate selector
    d3.json("samples.json").then((data) => {

        // test if data loads
        console.log(data);
        
    // populate dropdown box
        var sampleNames = data.names;
        
        // for each sample id, 
        sampleNames.forEach((sampleId) => {
            //
            selector.append("option")
                .text(sampleId)
                // set value property to be sampleId
                .property("value", sampleId);
        });
        
        var sampleId = sampleNames[0];

        // call functions 
        DrawBubblechart(sampleId);
        DrawBargraph(sampleId);
        ShowMetadata(sampleId);

    });
}

InitDashboard();