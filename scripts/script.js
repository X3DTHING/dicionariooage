document.getElementById('button-desactive').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.header_style').classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        document.getElementById('button-desactive').style.display = 'none';
        document.getElementById('button-active').style.display = 'block';
        document.getElementById('moon-desactive').style.display = 'none';
        document.getElementById('moon-active').style.display = 'block';
    } else {
        document.getElementById('button-desactive').style.display = 'block';
        document.getElementById('button-active').style.display = 'none';
        document.getElementById('moon-desactive').style.display = 'block';
        document.getElementById('moon-active').style.display = 'none';
    }
});

document.getElementById('button-active').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.header_style').classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        document.getElementById('button-desactive').style.display = 'none';
        document.getElementById('button-active').style.display = 'block';
        document.getElementById('moon-desactive').style.display = 'none';
        document.getElementById('moon-active').style.display = 'block';
    } else {
        document.getElementById('button-desactive').style.display = 'block';
        document.getElementById('button-active').style.display = 'none';
        document.getElementById('moon-desactive').style.display = 'block';
        document.getElementById('moon-active').style.display = 'none';
    }
});

document.getElementById('arrow-dropdown').addEventListener('click', function() {
    document.getElementById('font-options').classList.toggle('hidden');
});

document.querySelectorAll('#font-options li').forEach(function(item) {
    item.addEventListener('click', function() {
        var selectedFont = item.getAttribute('data-font');
        document.getElementById('current-font').innerText = selectedFont;
        document.body.style.fontFamily = selectedFont;
        document.getElementById('font-options').classList.add('hidden');
    });
});

document.getElementById('icon-search').addEventListener('click', function() {
    var input = document.getElementById('search-input');
    var searchWord = input.value.trim().toLowerCase();

    fetch('data/db.json')
        .then(response => response.json())
        .then(data => {
            const foundWord = data.palavras.find(word => word.palavra.toLowerCase() === searchWord);
            if (foundWord) {
                displayWord(foundWord);
                input.classList.remove('error');
                document.getElementById('error-message').classList.add('hidden');
            } else {
                input.classList.add('error');
                document.getElementById('error-message').classList.remove('hidden');
                document.getElementById('main-content').innerHTML = "<p id='texto-erro' style='font-size: 32px; text-align: center;color: red'>NÃO ENCONTRADO, TENTE NOVAMENTE</p>";
            }
        })
        .catch(error => {
            console.error('Erro ao carregar db.json:', error);
            input.classList.add('error');
            document.getElementById('error-message').classList.remove('hidden');
            document.getElementById('main-content').innerHTML = "<p id='texto-erro' style='font-size: 32px; text-align: center; color: red'>NÃO ENCONTRADO, TENTE NOVAMENTE</p>";
        });
});

document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('icon-search').click();
    }
});

function displayWord(word) {
    const mainContent = document.getElementById('main-content');
    const contentTitle = `
        <section class="content_title">
            <h1>${word.palavra}</h1>
            <p>${word.pronuncia}</p>
            <img src="assets/icons/icon-button-play.svg" alt="">
        </section>
    `;

    const contentDescription1 = `
        <section class="content_description1">
            <h2>noun<span><hr></span></h2>
            <h3>Meaning</h3>
            <ul>${word.significado.map(def => `<li>${def}</li>`).join('')}</ul>
            ${word.sinonimos && word.sinonimos.length > 0 ? `<p>Synonyms: <span>${word.sinonimos.join(', ')}</span></p>` : ''}
        </section>
    `;

    let contentDescription2 = '';
    if (word.verbo) {
        contentDescription2 = `
            <section class="content_description2">
                <h2>verb<span><hr></span></h2>
                <h3>Meaning</h3>
                <ul>${word.verbo.significado.map(def => `<li>${def}</li>`).join('')}</ul>
                <p>Example: ${word.verbo.exemplo}</p>
                <hr>
            </section>
        `;
    }

    mainContent.innerHTML = `
        <section class="content container-grid">
            <article>
                ${contentTitle}
                ${contentDescription1}
                ${contentDescription2}
            </article>
        </section>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('search-input');
    var searchIcon = document.getElementById('icon-search');
    var errorMessage = document.getElementById('error-message');
    var mainContent = document.getElementById('main-content');

    function performSearch() {
        var searchWord = input.value.trim().toLowerCase();
        fetch('data/db.json')
            .then(response => response.json())
            .then(data => {
                const foundWord = data.palavras.find(word => word.palavra.toLowerCase() === searchWord);
                if (foundWord) {
                    displayWord(foundWord);
                    input.classList.remove('error');
                    errorMessage.classList.add('hidden');
                } else {
                    input.classList.add('error');
                    errorMessage.classList.remove('hidden');
                    mainContent.innerHTML = "<p style='font-size: 24px; text-align: center;'>NÃO ENCONTRADO, TENTE NOVAMENTE</p>";
                }
            })
            .catch(error => {
                console.error('Erro ao carregar db.json:', error);
                input.classList.add('error');
                errorMessage.classList.remove('hidden');
                mainContent.innerHTML = "<p style='font-size: 24px; text-align: center;'>NÃO ENCONTRADO, TENTE NOVAMENTE</p>";
            });
    }

    function displayWord(word) {
        const contentTitle = `
            <section class="content_title">
                <h1>${word.palavra}</h1>
                <p>${word.pronuncia}</p>
                <img src="assets/icons/icon-button-play.svg" alt="">
            </section>
        `;

        const contentDescription1 = `
            <section class="content_description1">
                <h2>noun<span><hr></span></h2>
                <h3>Meaning</h3>
                <ul>${word.significado.map(def => `<li>${def}</li>`).join('')}</ul>
                ${word.sinonimos && word.sinonimos.length > 0 ? `<p>Synonyms: <span>${word.sinonimos.join(', ')}</span></p>` : ''}
            </section>
        `;

        let contentDescription2 = '';
        if (word.verbo) {
            contentDescription2 = `
                <section class="content_description2">
                    <h2>verb<span><hr></span></h2>
                    <h3>Meaning</h3>
                    <ul>${word.verbo.significado.map(def => `<li>${def}</li>`).join('')}</ul>
                    <p>Example: ${word.verbo.exemplo}</p>
                    <hr>
                </section>
            `;
        }

        mainContent.innerHTML = `
            <section class="content container-grid">
                <article>
                    ${contentTitle}
                    ${contentDescription1}
                    ${contentDescription2}
                </article>
            </section>
        `;
    }

    searchIcon.addEventListener('click', performSearch);

    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});
