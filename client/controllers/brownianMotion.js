var bMotion = bMotion || {
    dataset: {
        data: [],
        min: 9999999,
        max: 0
    },

    draw: function(){
        var canvas = document.getElementById('chart');
        var context = canvas.getContext('2d');

        if (!canvas.getContext){
            console.log('Canvas not supported!');
            return;
        }

        var width = canvas.width;
        var height = canvas.height;
        var padding = 25;

        var ctx = canvas.getContext('2d');

        // clear image
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // draw chart axes
        ctx.strokeStyle = '#000000';

        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        // draw chart data
        var data = this.dataset.data;

        var granularity = parseInt(document.getElementById('granularity').value);
        var xAxisSpacing = ((canvas.width - (padding * 2) * 1.0) / ((data.length-1) / granularity));
        var i;

        for(i=1, j=0; i<data.length; i = i + granularity, j++){
            if(data[i] > data[i - granularity]){
                ctx.strokeStyle = '#00aa00';
            } else {
                ctx.strokeStyle = '#aa0000';
            }

            ctx.beginPath();

            ctx.moveTo(padding + (xAxisSpacing * j), 
                (height - padding) - this.linearInterpolate(data[i-granularity], this.dataset.min, this.dataset.max, 0, height - (padding * 2)));

            ctx.lineTo(padding + (xAxisSpacing * (j + 1)), 
                (height - padding) - this.linearInterpolate(data[i], this.dataset.min, this.dataset.max, 0, height - (padding * 2)));

            ctx.stroke();
        }
    },

    generateNewData: function (mean, standardDeviation){
        this.dataset.data = [mean];
        this.dataset.min = mean;
        this.dataset.max = mean;

        var i;
        var lastValue = mean;

        for(i=0; i<9999; i++){
            lastValue = this.getGaussianRandomValue(lastValue, standardDeviation);
            this.dataset.data.push(lastValue);

            if(lastValue < this.dataset.min){ this.dataset.min = lastValue; }
            if(lastValue > this.dataset.max){ this.dataset.max = lastValue; }
        }
    },

    initialize: function (){
        this.generateNewData(100, 8);

        this.draw();
    },


    linearInterpolate: function (x, x1, x2, y1, y2){
        var f = (x - x1) / (x2 - x1);
        var y = (y1 * (1.0 - f) + (y2 * f));

        return y;
    },

    getGaussianRandomValue: function (mean, standardDeviation){
        return mean + (this.gaussianRandom() * standardDeviation);
    },

    gaussianRandom: function () {
        var u = 2 * Math.random() - 1;
        var v = 2 * Math.random() - 1;
        var r = u*u + v*v;

        if(r === 0 || r > 1){
            return this.gaussianRandom();
        }

        var c = Math.sqrt(-2 * Math.log(r) / r);
        return u * c;
    }
};

Template.brownianMotion.events({
    'click #new-chart': function(){
        bMotion.initialize();
    },

    'change #granularity': function(){
        bMotion.draw();
    }
});

Template.brownianMotion.rendered = function(){
    bMotion.initialize();
};