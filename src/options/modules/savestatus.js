export default (state, msg) => {
    if (state) {
        const p = document.getElementById('saveMessage');
        p.textContent = `Successfully saved! ${msg || ''}`;
        p.style.color = 'green';
        p.style.visibility = 'visible';
        setTimeout(() => {
            p.style.visibility = 'hidden';
        }, 1000);
    } else {
        const p = document.getElementById('saveMessage');
        p.innerText = `Save Unsuccessful :(\nError:\n${msg}`;
        p.style.color = 'red';
        p.style.visibility = 'visible';
        setTimeout(() => {
            p.style.visibility = 'hidden';
        }, 5000);
    }
};
