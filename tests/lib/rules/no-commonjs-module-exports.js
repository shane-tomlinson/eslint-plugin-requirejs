/**
 * @fileoverview Tests for `no-commonjs-module-exports` rule
 * @author Casey Visco <cvisco@gmail.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var RuleTester = require("eslint").RuleTester,
    fixtures = require("../../fixtures"),
    rule = require("../../../lib/rules/no-commonjs-module-exports");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ERROR = {
    message: "Unexpected use of `module.exports` in module definition.",
    type: "AssignmentExpression"
};

var ruleTester = new RuleTester();

ruleTester.run("no-commonjs-module-exports", rule, {

    valid: [
        fixtures.OBJECT_DEFINE,
        fixtures.FUNCTION_DEFINE,
        fixtures.AMD_DEFINE,
        fixtures.AMD_EMPTY_DEFINE,
        fixtures.NAMED_OBJECT_DEFINE,
        fixtures.NAMED_FUNCTION_DEFINE,
        fixtures.NAMED_AMD_DEFINE,
        fixtures.NAMED_AMD_EMPTY_DEFINE,
        fixtures.CJS_WITH_RETURN,
        fixtures.CJS_WITH_EXPORTS,
        fixtures.NON_WRAPPED_EXPORTS
    ],

    invalid: [
        { code: fixtures.CJS_WITH_MODULE_EXPORTS, errors: [ERROR] },
        { code: fixtures.CJS_WITH_FUNC_EXPR, errors: [ERROR] },
        { code: fixtures.NAMED_CJS_DEFINE, errors: [ERROR] }
    ]

});
