var fs = require('fs');
var path = require('path');
var fileExists = require('file-exists');

var ROOT = path.dirname(__dirname);
var IMAGES = path.join(ROOT, 'images');

/**
 * Helper that returns the markup of an SVG image
 *
 * @param  {string} icon The name of the icon to render
 * @param  {object} context The handlebars data object
 * @return {string}
 */
exports.renderSVG = function(icon, context) {
    var filename = icon + '.svg';
    var file = getIconFile(filename, context);

    if (!file) {
        return '<!-- No image found for ' + filename + ' -->';
    }

    return fs.readFileSync(file, 'utf8');
};

/**
 * Helper that returns a Base64-encoded PNG image
 *
 * @param  {string} icon The name of the icon to render
 * @param  {object} context The handlebars data object
 * @return {string}
 */
exports.renderPNG = function(icon, context) {
    var filename = icon + '.png';
    var file = getIconFile(filename, context);

    if (!file) {
        return '<!-- No image found for ' + filename + ' -->';
    }

    var iconBuffer = fs.readFileSync(file);
    var base64Image = new Buffer(iconBuffer).toString('base64');

    return '<img src="data:image/png;base64,' + base64Image + '" />';
};

/**
 * Finds and returns an icon file in the asset name space
 * or failing that looks for a default icon file
 *
 * @param  {string} filename The file name to look for
 * @param  {object} context The handlebars data object
 * @return {mixed}
 */
function getIconFile(filename, context) {
    var namespace = context.data.root.assetNamespace ? context.data.root.assetNamespace : '';
    var iconPath = path.join(IMAGES, namespace, filename);

    if (!fileExists(iconPath)) {
        iconPath = path.join(IMAGES, filename);
    }

    if (!fileExists(iconPath)) {
        return false;
    }

    return iconPath;
}
