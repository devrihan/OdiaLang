const code = `
    eita x = 78;
    eita y = 74;

    eita sum = x + y;

    kaha sum;
    `;










function lexer(input) {
    const tokens = [];
    let cursor = 0;

    while (cursor < input.length) {
        let char = input[cursor];

        if (/^\s+$/.test(char)) {
            cursor++;
            continue;
        }

        if (/[a-zA-Z]/.test(char)) {
            let word = '';
            while (/[a-zA-Z]/.test(char)) {
                word += char;
                cursor++;
                if (cursor >= input.length) break;
                char = input[cursor];
            }

            if (word.trim() === 'eita' || word.trim() === 'kaha') { // Use trim() to remove leading/trailing whitespace
                tokens.push({ type: 'keyword', value: word.trim() });
            }
            else {
                tokens.push({ type: 'identifier', value: word.trim() });
            }
            continue;
        }

        if (/[0-9]/.test(char)) {
            let num = '';
            while (/[0-9]/.test(char)) {
                num += char;
                cursor++;
                if (cursor >= input.length) break;
                char = input[cursor];
            }

            tokens.push({ type: 'number', value: parseInt(num) });
            continue;
        }

        if (/[\+\-\*\/=]/.test(char)) {
            tokens.push({ type: 'operator', value: char });
            cursor++;
            continue;
        }

        cursor++;
    }

    return tokens;
}

function parser(tokens) {

    const ast = {
        type: 'program',
        body: []
    };

    while (tokens.length > 0) {
        let token = tokens.shift();

        if (token.type === 'keyword' && token.value === 'eita') {
            let declaration = {
                type: 'Declaration',
                name: tokens.shift().value,
                value: null
            };


            if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                tokens.shift(); 
                let expression = '';
                while (tokens.length > 0 && tokens[0].type !== 'keyword') {
                    expression += tokens.shift().value;
                }

                declaration.value = expression.trim();
            }

            ast.body.push(declaration);


        }

        if (token. type === 'keyword' && token. value === 'kaha'){
            ast. body. push ({
                type: 'Print',
                expression: tokens.shift().value });
            }

    }

    return ast;

}


function codeGen(node){
    switch(node.type){
        case 'program': return node.body.map(codeGen).join('\n')
        case 'Declaration': return `const ${node.name}=${node.value};`
        case 'Print': return `console.log(${node.expression})`
    }

}

function compiler(input) {
    const token = lexer(input);
    const ast = parser(token)
    const exe= codeGen(ast)
    return exe
}

function runner(input){
    eval(input);
}

const exec=compiler(code);
runner(exec);


