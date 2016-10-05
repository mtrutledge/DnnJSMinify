!function(mod){"object"==typeof exports&&"object"==typeof module?mod(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],mod):mod(CodeMirror)}(function(CodeMirror){"use strict";CodeMirror.defineMode("apl",function(){var builtInOps={".":"innerProduct","\\":"scan","/":"reduce","⌿":"reduce1Axis","⍀":"scan1Axis","¨":"each","⍣":"power"},builtInFuncs={"+":["conjugate","add"],"−":["negate","subtract"],"×":["signOf","multiply"],"÷":["reciprocal","divide"],"⌈":["ceiling","greaterOf"],"⌊":["floor","lesserOf"],"∣":["absolute","residue"],"⍳":["indexGenerate","indexOf"],"?":["roll","deal"],"⋆":["exponentiate","toThePowerOf"],"⍟":["naturalLog","logToTheBase"],"○":["piTimes","circularFuncs"],"!":["factorial","binomial"],"⌹":["matrixInverse","matrixDivide"],"<":[null,"lessThan"],"≤":[null,"lessThanOrEqual"],"=":[null,"equals"],">":[null,"greaterThan"],"≥":[null,"greaterThanOrEqual"],"≠":[null,"notEqual"],"≡":["depth","match"],"≢":[null,"notMatch"],"∈":["enlist","membership"],"⍷":[null,"find"],"∪":["unique","union"],"∩":[null,"intersection"],"∼":["not","without"],"∨":[null,"or"],"∧":[null,"and"],"⍱":[null,"nor"],"⍲":[null,"nand"],"⍴":["shapeOf","reshape"],",":["ravel","catenate"],"⍪":[null,"firstAxisCatenate"],"⌽":["reverse","rotate"],"⊖":["axis1Reverse","axis1Rotate"],"⍉":["transpose",null],"↑":["first","take"],"↓":[null,"drop"],"⊂":["enclose","partitionWithAxis"],"⊃":["diclose","pick"],"⌷":[null,"index"],"⍋":["gradeUp",null],"⍒":["gradeDown",null],"⊤":["encode",null],"⊥":["decode",null],"⍕":["format","formatByExample"],"⍎":["execute",null],"⊣":["stop","left"],"⊢":["pass","right"]},isOperator=/[\.\/⌿⍀¨⍣]/,isNiladic=/⍬/,isFunction=/[\+−×÷⌈⌊∣⍳\?⋆⍟○!⌹<≤=>≥≠≡≢∈⍷∪∩∼∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⌷⍋⍒⊤⊥⍕⍎⊣⊢]/,isArrow=/←/,isComment=/[⍝#].*$/,stringEater=function(type){var prev;return prev=!1,function(c){return prev=c,c!==type||"\\"===prev}};return{startState:function(){return{prev:!1,func:!1,op:!1,string:!1,escape:!1}},token:function(stream,state){var ch,funcName,word;return stream.eatSpace()?null:(ch=stream.next(),'"'===ch||"'"===ch?(stream.eatWhile(stringEater(ch)),stream.next(),state.prev=!0,"string"):/[\[{\(]/.test(ch)?(state.prev=!1,null):/[\]}\)]/.test(ch)?(state.prev=!0,null):isNiladic.test(ch)?(state.prev=!1,"niladic"):/[¯\d]/.test(ch)?(state.func?(state.func=!1,state.prev=!1):state.prev=!0,stream.eatWhile(/[\w\.]/),"number"):isOperator.test(ch)?"operator apl-"+builtInOps[ch]:isArrow.test(ch)?"apl-arrow":isFunction.test(ch)?(funcName="apl-",null!=builtInFuncs[ch]&&(funcName+=state.prev?builtInFuncs[ch][1]:builtInFuncs[ch][0]),state.func=!0,state.prev=!1,"function "+funcName):isComment.test(ch)?(stream.skipToEnd(),"comment"):"∘"===ch&&"."===stream.peek()?(stream.next(),"function jot-dot"):(stream.eatWhile(/[\w\$_]/),word=stream.current(),state.prev=!0,"keyword"))}}}),CodeMirror.defineMIME("text/apl","apl")});