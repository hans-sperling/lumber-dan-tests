(function LumberDanTrees() {
    // ---------------------------------------------------------------------------------------------- Initial properties

    var canvas   = document.getElementById('canvas'),
        ctx      = canvas.getContext('2d');

    var tree1 = new Tree();
    var tree2 = new Tree();
    var tree3 = new Tree();
    var tree4 = new Tree();
    var tree5 = new Tree();
    var tree6 = new Tree();
    var tree7 = new Tree();


    tree1.renderTree(ctx, 100, 500);
    tree2.renderTree(ctx, 200, 300);
    tree3.renderTree(ctx, 300, 500);
    tree4.renderTree(ctx, 400, 300);
    tree5.renderTree(ctx, 500, 500);
    tree6.renderTree(ctx, 600, 300);
    tree7.renderTree(ctx, 700, 500);



    /**
     *
     * @returns {{renderTree: renderTree}}
     * @constructor
     */
    function Tree() {
        // --------------------------------------------------------------------------------------------- Tree properties
        var config = {
                unitSize : 50,
                trunk : {
                    width  : { min : 1, max : 1 },
                    height : { min : 1, max : 2 },
                    color  : {
                        r : { min : 100, max : 150 },
                        g : { min : 63,  max : 63 },
                        b : { min : 31,  max : 31 },
                        a : { min : 1,   max : 1 }
                    }
                },
                crown : {
                    width  : { min : 3, max : 3 },
                    height : { min : 1, max : 1 },
                    color  : {
                        r : { min : 63,  max : 63 },
                        g : { min : 100, max : 150 },
                        b : { min : 31,  max : 31 },
                        a : { min : 1,   max : 1 }
                    }
                }
            },
            properties = {
                trunk : {
                    width  : 0,
                    height : 0,
                    color  : {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    }
                },
                crown : {
                    width  : 0,
                    height : 0,
                    color  : {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    }
                }
            };

        // ---------------------------------------------------------------------------------------- Computing properties

        properties.trunk.width   = getValueBetween(config.trunk.width.min,   config.trunk.width.max)  * config.unitSize;
        properties.trunk.height  = getValueBetween(config.trunk.height.min,  config.trunk.height.max) * config.unitSize;
        properties.trunk.color.r = getValueBetween(config.trunk.color.r.min, config.trunk.color.r.max);
        properties.trunk.color.g = getValueBetween(config.trunk.color.g.min, config.trunk.color.g.max);
        properties.trunk.color.b = getValueBetween(config.trunk.color.b.min, config.trunk.color.b.max);
        properties.trunk.color.a = getValueBetween(config.trunk.color.a.min, config.trunk.color.a.max);

        properties.crown.width   = getValueBetween(config.crown.width.min,   config.crown.width.max)  * config.unitSize;
        properties.crown.heigth  = getValueBetween(config.crown.height.min,  config.crown.height.max) * config.unitSize;
        properties.crown.color.r = getValueBetween(config.crown.color.r.min, config.crown.color.r.max);
        properties.crown.color.g = getValueBetween(config.crown.color.g.min, config.crown.color.g.max);
        properties.crown.color.b = getValueBetween(config.crown.color.b.min, config.crown.color.b.max);
        properties.crown.color.a = getValueBetween(config.crown.color.a.min, config.crown.color.a.max);


        // ---------------------------------------------------------------------------------------------- Helper methods

        /**
         * Returns a random value between the given min and max.
         *
         * @param   {Number} min
         * @param   {Number} max
         * @returns {Number}
         */
        function getValueBetween(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }


        /**
         * Renders the complete tree.
         *
         * @param ctx
         * @param x
         * @param y
         */
        function renderTree(ctx, x, y) {

            // -------------------------------------------------------------------------------------------- Render trunk
            /* Der Baumstamm wird als Recheck gezeichnet und ist ausschließlich der senkrechte Teil. lles Andere, wie
             * z.B. Äste, werden hier nicht berücksichtigt, das ist Teil des Branch-Abschnitts.
             */
/*
            ctx.beginPath();
            ctx.moveTo(x - (properties.trunk.width / 2), y);                            // Ecke links unten
            ctx.lineTo(x - (properties.trunk.width / 2), y - properties.trunk.height);  // Seite links
            ctx.lineTo(x + (properties.trunk.width / 2), y - properties.trunk.height);  // Seite oben
            ctx.lineTo(x + (properties.trunk.width / 2), y);                            // Seite oben
            ctx.lineTo(x - (properties.trunk.width / 2), y);                            // Seite oben
            ctx.fillStyle = 'rgba(' + properties.trunk.color.r + ',' + properties.trunk.color.g + ',' + properties.trunk.color.b + ',' + properties.trunk.color.a + ')';
            ctx.fill();
            ctx.closePath();*/

            // -------------------------------------------------------------------------------------------- Render crown

            ctx.beginPath();
            ctx.moveTo(x - (properties.crown.width / 2), y - properties.trunk.height);                               // Ecke links unten
            ctx.lineTo(x - (properties.crown.width / 2), y - properties.crown.height);   // Seite links
            ctx.lineTo(x + (properties.crown.width / 2), y - properties.crown.height);   // Seite oben
            ctx.lineTo(x + (properties.crown.width / 2), y - properties.trunk.height);   // Seite rechts
            ctx.lineTo(x - (properties.crown.width / 2), y - properties.trunk.height);   // Seite unten



            ctx.fillStyle = 'rgba(' + properties.crown.color.r + ',' + properties.crown.color.g + ',' + properties.crown.color.b + ',' + properties.crown.color.a + ')';
            ctx.fill();
            ctx.closePath();

            console.log(x, y);
            console.log(x - (properties.crown.width / 2), y - properties.trunk.height);
            console.log(x - (properties.crown.width / 2), y - properties.crown.height);


            // ----------------------------------------------------------------------------------------- Renter branches

            // ------------------------------------------------------------------------------------------- Renter leaves

        }

        // ------------------------------------------------------------------------------------------------------ Return

        return {
            renderTree : renderTree
        };
    }

})();
