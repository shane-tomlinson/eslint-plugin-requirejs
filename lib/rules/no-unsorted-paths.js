/**
 * @fileoverview Disallow unsorted paths
 * @author Shane Tomlinson
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var util = require("../util");


//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    var MESSAGE = "Dependency paths must be sorted alphabetically";

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------


    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
        "CallExpression": function (node) {
            if (util.isDefineCall(node) || util.isRequireCall(node)) {
                util.getDependencyNodes(node).reduce(function (lastPathName, pathNode) {
                    var pathName = pathNode.value.toLowerCase().replace(/\.?\.\//g, '');

                    if (lastPathName && pathName < lastPathName) {
                        context.report(pathNode, MESSAGE);
                    }

                    return pathName;
                }, '');
            }
        }
    };

};

//------------------------------------------------------------------------------
// Rule Schema
//------------------------------------------------------------------------------

module.exports.schema = [];
