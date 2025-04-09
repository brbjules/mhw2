const allPosts = document.querySelectorAll('article');
let tempIndex = 1;
for (const post of allPosts) {
    post.dataset.index = tempIndex;
    if (tempIndex % 2 === 1)
        post.classList.add('odd');
    tempIndex++;
    post.querySelector('.rank').textContent = post.dataset.index;
    post.querySelector('.hide').addEventListener('click', hidePost);
    post.querySelector('.share').addEventListener('click', sharePost);
    let extLink = post.querySelector('.domain a');
    if (extLink !== null)
        extLink.addEventListener('click', modalCreate);
}

function hidePost(event) {
    let curPost = event.currentTarget;
    for (let i = 0; i < 3; i++)
        curPost = curPost.parentNode;
    for (const child of curPost.querySelectorAll('.votes, .entry, .thumbnail'))
        child.classList.add('hidden');
    curPost.querySelector('.hide-text').classList.remove('hidden');
    curPost.querySelector('.hide-text a').addEventListener('click', unhidePost);
    event.currentTarget.removeEventListener('click', hidePost);
}

function unhidePost(event) {
    const hiddenDiv = event.currentTarget.parentNode;
    let curPost = hiddenDiv.parentNode;
    for (const child of curPost.querySelectorAll('.votes, .entry, .thumbnail'))
        child.classList.remove('hidden');
    hiddenDiv.classList.add('hidden');
    curPost.querySelector('.hide').addEventListener('click', hidePost);
    event.currentTarget.removeEventListener('click', unhidePost);
}

let isShareClick = false;

function clickedOnMenu() {
    isShareClick = true;
}

function sharePost(event) {
    let otherMenu = document.querySelector('.share-menu');
    if (otherMenu !== null)
        otherMenu.remove();
    clickedOnMenu();
    const shareDiv = document.createElement('div');
    event.currentTarget.parentNode.appendChild(shareDiv);
    shareDiv.classList.add('share-menu');
    const linkButton = shareDiv.appendChild(document.createElement('a'));
    linkButton.href = '#';
    linkButton.appendChild(document.createElement('img')).src = 'sharebutton.png';
    shareDiv.appendChild(document.createElement('p')).textContent = 'Copy link';
    linkButton.addEventListener('click', copied);
    document.addEventListener('click', shareBlur);
    shareDiv.addEventListener('click', clickedOnMenu);
}

function shareBlur() {
    const icon = document.querySelector('.share-menu a');
    if (icon !== null) {
        if (!isShareClick)
            icon.parentNode.remove();
        isShareClick = false;
    }
}

function copied(event) {
    clickedOnMenu();
    let button = event.currentTarget;
    button.querySelector('img').src = 'sharecheck.png';
    button.parentNode.querySelector('p').textContent = 'Copied!';
    button.removeEventListener('click', copied);
}

function modalCreate(event) {
    const modalParent = document.createElement('section');
    modalParent.id = 'modal';
    document.body.appendChild(modalParent);
    const modalDiv = modalParent.appendChild(document.createElement('div'));
    const modalHeader = modalDiv.appendChild(document.createElement('h1'));
    modalHeader.textContent = 'You\'re about to leave LogoSito';
    modalDiv.appendChild(document.createElement('p')).textContent = 'Do you want to continue?';
    const modalText2 = modalDiv.appendChild(document.createElement('p'));
    modalText2.classList.add('link-preview');
    modalText2.textContent = 'example.com';
    const yesButton = modalDiv.appendChild(document.createElement('a'));
    yesButton.href = '#';
    yesButton.textContent = 'Yes';
    const noButton = modalDiv.appendChild(document.createElement('a'));
    noButton.href = '#';
    noButton.textContent = 'No, take me back';
    noButton.addEventListener('click', modalClose);
    document.body.classList.add('no-scroll');
}

function modalClose(event) {
    document.querySelector('#modal').remove();
    document.body.classList.remove('no-scroll');
}
