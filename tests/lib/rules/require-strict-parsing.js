"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let rule = require("../../../lib/rules/require-strict-parsing"),

    RuleTester = require("eslint").RuleTester;

const MESSAGE = "Always prefer strict format check over loose format check.";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

let ruleTester = new RuleTester();

ruleTester.run("require-strict-parsing", rule, {

    valid: [
        {
            code: "moment.tz('01/12/2018', 'MM/DD/YYYY', true, MY_TIME_ZONE);"
        },
        {
            code: "moment.tz('01/12/2018', 'MM/DD/YYYY', true, 'America/Chicago');"
        },
        {
            code: "moment.tz(timezone);"
        },
        {
            code: "moment('01/12/2018', 'MM/DD/YYYY', true);"
        },
        {
            code: "moment(aDateStringVariable, aFormatVariable, true);"
        },
        {
            code: "moment.utc('01/12/2018', 'MM/DD/YYYY', 'en', true);"
        },
        {
            code: "moment.utc('01/12/2018', 'MM/DD/YYYY', true);"
        },
        {
            code: "moment.utc();"
        },
        {
            code: "moment();"
        },
        {
            code: "something()"
        },
        {
            code: "something.else()"
        },
        {
            code: "something.tz()"
        },
        {
            code: "something.utc()"
        }
    ],

    invalid: [
        {
            code: "moment.tz('01/12/2018', 'MM/DD/YYYY', false, MY_TIME_ZONE);",
            errors: [
                {
                    message: MESSAGE,
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "moment.tz('01/12/2018', 'MM/DD/YYYY', SOME_TRUE_CONSTANT, MY_TIME_ZONE);",
            errors: [
                {
                    message: MESSAGE,
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "moment.tz('01/12/2018', 'MM/DD/YYYY', MY_TIME_ZONE);",
            errors: [
                {
                    message: MESSAGE,
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "moment.tz('01/12/2018', 'MM/DD/YYYY', false);",
            errors: [
                {
                    message: MESSAGE,
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "moment.tz('01/12/2018', 'MM/DD/YYYY', true);",
            errors: [
                {
                    message: MESSAGE,
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "moment.tz('01/12/2018', 'MM/DD/YYYY');",
            errors: [
                {
                    message: MESSAGE,
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "moment('01/12/2018', 'MM/DD/YYYY', false);",
            errors: [
                {
                    message: MESSAGE,
                    type: "CallExpression"
                }
            ]
        },
        {
            code: "moment('01/12/2018', 'MM/DD/YYYY');",
            errors: [
                {
                    message: MESSAGE,
                    type: "CallExpression"
                }
            ]
        },
        {
            // No support for variables as strict parsing flag. Pass in `true` explicitly.
            code: "moment.tz('01/12/2018', 'MM/DD/YYYY', MY_VARIABLE, MY_TIME_ZONE);",
            errors: [
                {
                    message: MESSAGE,
                    type: "CallExpression"
                }
            ]
        }
    ]
});
