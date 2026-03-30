const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (safari) {
    document.documentElement.classList.add('safari');
}
