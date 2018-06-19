(function LumberDanTrees() {
    // ---------------------------------------------------------------------------------------------- Initial properties

    var canvas   = document.getElementById('canvas'),
        ctx      = canvas.getContext('2d');

    var treeType1 = {
        unitSize : 30,
        trunk : {
            width  : { min : 1, max : 1 },
            height : { min : 3, max : 5 },
            color  : {
                r : { min : 95, max : 143 },
                g : { min : 63,  max : 63 },
                b : { min : 31,  max : 31 },
                a : { min : 1,   max : 1 }
            },
            lightning     : -15,
            lightningSize : 0.3
        },
        crown : {
            width  : { min : 4, max : 6 },
            height : { min : 1, max : 1 },
            color  : {
                r : { min : 63,  max : 63 },
                g : { min : 100, max : 150 },
                b : { min : 31,  max : 31 },
                a : { min : 1,   max : 1 }
            },
            lightning : -5,
            stepSize  : { min : 0.8,  max : 1.2 }
        },
        stump : {
            height : { min : 0.5, max : 1.2 }
        }
    },
    treeType2 = {
        unitSize : 30,
        trunk : {
            width  : { min : 1, max : 1 },
            height : { min : 1, max : 2 },
            color  : {
                r : { min : 63, max : 95 },
                g : { min : 63, max : 63 },
                b : { min : 31, max : 31 },
                a : { min : 1,  max : 1 }
            },
            lightning     : -15,
            lightningSize : 0.3
        },
        crown : {
            width  : { min : 3, max : 5 },
            height : { min : 1, max : 1 },
            color  : {
                r : { min : 63,  max : 63 },
                g : { min : 127, max : 195 },
                b : { min : 95,  max : 127 },
                a : { min : 1,   max : 1 }
            },
            lightning : -5,
            stepSize  : { min : 1.5,  max : 2 }
        },
        stump : {
            height : { min : 0.5, max : 1.2 }
        }
    };

    var tree11 = new Tree(treeType1);
    var tree12 = new Tree(treeType1);
    var tree13 = new Tree(treeType1);
    var tree14 = new Tree(treeType1);

    var tree21 = new Tree(treeType2);
    var tree22 = new Tree(treeType2);
    var tree23 = new Tree(treeType2);
    var tree24 = new Tree(treeType2);


    tree11.renderTree(     ctx, 100, 300);
    tree11.renderTreeStump(ctx, 150, 300);
    tree12.renderTree(     ctx, 300, 300);
    tree12.renderTreeStump(ctx, 350, 300);
    tree13.renderTree(     ctx, 500, 300);
    tree13.renderTreeStump(ctx, 550, 300);
    tree14.renderTree(     ctx, 700, 300);
    tree14.renderTreeStump(ctx, 750, 300);

    tree21.renderTree(     ctx, 100, 600);
    tree21.renderTreeStump(ctx, 150, 600);
    tree22.renderTree(     ctx, 300, 600);
    tree22.renderTreeStump(ctx, 350, 600);
    tree23.renderTree(     ctx, 500, 600);
    tree23.renderTreeStump(ctx, 550, 600);
    tree24.renderTree(     ctx, 700, 600);
    tree24.renderTreeStump(ctx, 750, 600);


    /**
     *
     * @returns {{renderTree: renderTree}}
     * @constructor
     */
    function Tree(config) {

        // --------------------------------------------------------------------------------------------- Tree properties
        var properties = {
                unitSize : 0,
                trunk : {
                    width  : 0,
                    height : 0,
                    color  : {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    },
                    lightning : 0,
                    lightningSize : 0
                },
                crown : {
                    width  : 0,
                    height : 0,
                    color  : {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    },
                    lightning : 0,
                    stepSize  : 0

                },
                stump : {
                    height : 0
                }
            };

        // ---------------------------------------------------------------------------------------- Computing properties

        properties.unitSize            = config.unitSize;
        properties.trunk.width         = getValueBetween(config.trunk.width.min,   config.trunk.width.max, true)  * config.unitSize;
        properties.trunk.height        = getValueBetween(config.trunk.height.min,  config.trunk.height.max, true) * config.unitSize;
        properties.trunk.color.r       = getValueBetween(config.trunk.color.r.min, config.trunk.color.r.max, true);
        properties.trunk.color.g       = getValueBetween(config.trunk.color.g.min, config.trunk.color.g.max, true);
        properties.trunk.color.b       = getValueBetween(config.trunk.color.b.min, config.trunk.color.b.max, true);
        properties.trunk.color.a       = getValueBetween(config.trunk.color.a.min, config.trunk.color.a.max, true);
        properties.trunk.lightning     = config.trunk.lightning;
        properties.trunk.lightningSize = config.trunk.lightningSize;

        properties.crown.width     = getValueBetween(config.crown.width.min,   config.crown.width.max, true)  * config.unitSize;
        properties.crown.height    = getValueBetween(config.crown.height.min,  config.crown.height.max, true) * config.unitSize;
        properties.crown.color.r   = getValueBetween(config.crown.color.r.min, config.crown.color.r.max, true);
        properties.crown.color.g   = getValueBetween(config.crown.color.g.min, config.crown.color.g.max, true);
        properties.crown.color.b   = getValueBetween(config.crown.color.b.min, config.crown.color.b.max, true);
        properties.crown.color.a   = getValueBetween(config.crown.color.a.min, config.crown.color.a.max, true);
        properties.crown.lightning = config.crown.lightning;
        properties.crown.stepSize  = getValueBetween(config.crown.stepSize.min, config.crown.stepSize.max, false);

        properties.stump.height = getValueBetween(config.stump.height.min, config.stump.height.max, false) * config.unitSize;

        // ---------------------------------------------------------------------------------------------- Helper methods

        /**
         * Returns a random value between the given min and max.
         *
         * @param   {Number}  min
         * @param   {Number}  max
         * @param   {Boolean} floor
         * @returns {Number}
         */
        function getValueBetween(min, max, floor) {
            if (floor) {
                return Math.floor(Math.random() * (max - min) + min);
            }
            return Math.random() * (max - min) + min;
        }


        /**
         * Returns the rgba-color string of the given color computed with the given lightning percentage.
         *
         * @param   {Object} color - {r, g, b, a}
         * @param   {Number} lighting - Percentage number to compute with the base color
         * @returns {String} 'rgba(r, g, b, a)'
         */
        function getRgbColor(color, lighting) {
            return 'rgba('+
                Math.round(color.r + (2.55 * lighting)) + ', ' +
                Math.round(color.g + (2.55 * lighting)) + ', ' +
                Math.round(color.b + (2.55 * lighting)) + ', ' +
                color.a + ')';
        }

        /**
         * Renders the complete tree.
         *
         * @param ctx
         * @param x
         * @param y
         */
        function renderTree(ctx, x, y) {
            var amount = properties.crown.width / properties.unitSize,
                i;

            // -------------------------------------------------------------------------------------------- Render trunk

            ctx.beginPath();
            ctx.moveTo(x - (properties.trunk.width / 2), y);                            // Ecke links unten
            ctx.lineTo(x - (properties.trunk.width / 2), y - properties.trunk.height);  // Seite links
            ctx.lineTo(x + (properties.trunk.width / 2), y - properties.trunk.height);  // Seite oben
            ctx.lineTo(x + (properties.trunk.width / 2), y);                            // Seite rechts
            ctx.lineTo(x - (properties.trunk.width / 2), y);                            // Seite unten
            ctx.fillStyle = getRgbColor(properties.trunk.color, 0);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(x - (properties.trunk.width / 2), y);                                                                                        // Ecke links unten
            ctx.lineTo(x - (properties.trunk.width / 2), y - properties.trunk.height);                                                              // Seite links
            ctx.lineTo(x - (properties.trunk.width / 2) + (properties.trunk.width * properties.trunk.lightningSize), y - properties.trunk.height);  // Seite oben
            ctx.lineTo(x - (properties.trunk.width / 2) + (properties.trunk.width * properties.trunk.lightningSize), y);                            // Seite rechts
            ctx.lineTo(x - (properties.trunk.width / 2), y);                                                                                        // Seite unten
            ctx.fillStyle = getRgbColor(properties.trunk.color, properties.trunk.lightning);
            ctx.fill();
            ctx.closePath();

            // -------------------------------------------------------------------------------------------- Render crown

            for (i = 0; i < amount; i++) {
                ctx.beginPath();
                ctx.moveTo(x - ( (properties.crown.width - (properties.unitSize * i) ) / 2 ), (y - properties.trunk.height) - (properties.unitSize * properties.crown.stepSize * (i)     )); // Ecke links unten
                ctx.lineTo(x - ( (properties.crown.width - (properties.unitSize * i) ) / 2 ), (y - properties.trunk.height) - (properties.unitSize * properties.crown.stepSize * (i + 1) )); // Seite links
                ctx.lineTo(x + ( (properties.crown.width - (properties.unitSize * i) ) / 2 ), (y - properties.trunk.height) - (properties.unitSize * properties.crown.stepSize * (i + 1) )); // Seite oben
                ctx.lineTo(x + ( (properties.crown.width - (properties.unitSize * i) ) / 2 ), (y - properties.trunk.height) - (properties.unitSize * properties.crown.stepSize * (i)     )); // Seite rechts
                ctx.lineTo(x - ( (properties.crown.width - (properties.unitSize * i) ) / 2 ), (y - properties.trunk.height) - (properties.unitSize * properties.crown.stepSize * (i)     )); // Seite unten

                ctx.fillStyle = getRgbColor(properties.crown.color, properties.crown.lightning * i);
                ctx.fill();
                ctx.closePath();
            }
        }


        /**
         * Renders the complete tree.
         *
         * @param ctx
         * @param x
         * @param y
         */
        function renderTreeStump(ctx, x, y) {

            // -------------------------------------------------------------------------------------------- Render trunk

            ctx.beginPath();
            ctx.moveTo(x - (properties.trunk.width / 2), y);                            // Ecke links unten
            ctx.lineTo(x - (properties.trunk.width / 2), y - properties.stump.height);  // Seite links
            ctx.lineTo(x + (properties.trunk.width / 2), y - properties.stump.height);  // Seite oben
            ctx.lineTo(x + (properties.trunk.width / 2), y);                            // Seite rechts
            ctx.lineTo(x - (properties.trunk.width / 2), y);                            // Seite unten
            ctx.fillStyle = getRgbColor(properties.trunk.color, 0);
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(x - (properties.trunk.width / 2), y);                                                                                        // Ecke links unten
            ctx.lineTo(x - (properties.trunk.width / 2), y - properties.stump.height);                                                              // Seite links
            ctx.lineTo(x - (properties.trunk.width / 2) + (properties.trunk.width * properties.trunk.lightningSize), y - properties.stump.height);  // Seite oben
            ctx.lineTo(x - (properties.trunk.width / 2) + (properties.trunk.width * properties.trunk.lightningSize), y);                            // Seite rechts
            ctx.lineTo(x - (properties.trunk.width / 2), y);                                                                                        // Seite unten
            ctx.fillStyle = getRgbColor(properties.trunk.color, properties.trunk.lightning);
            ctx.fill();
            ctx.closePath();
        }

        // ------------------------------------------------------------------------------------------------------ Return

        return {
            renderTree : renderTree,
            renderTreeStump : renderTreeStump
        };
    }

})();
