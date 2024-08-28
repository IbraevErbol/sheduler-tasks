import * as rootRightUp from '../root/roots.js';
import { updateTaskTable, updateTaskComp } from '../structureLogic/centreCont.js';

let items = JSON.parse(localStorage.getItem('items')) || [];

function updateTaskLen(){
    document.querySelector('.allLen').textContent = items.length;   
}
// function updateInComp(items) {
//     let incompleteCount = items.length - items.filter(el => el.check).length;
//     document.querySelector('.allInComp').textContent = incompleteCount;
// }

document.addEventListener('DOMContentLoaded', () => {   
    
    updateTaskLen();
    updateTaskTable();
   // updateInComp(items);
    
    rootRightUp.BTN_NEW.addEventListener('click', () => {
        rootRightUp.MODAL.classList.add('active');
        rootRightUp.OVERLAY.classList.add('active');
    })
    
    rootRightUp.CLOSE_BTN.addEventListener('click', () => {
        rootRightUp.MODAL.classList.remove('active');
        rootRightUp.OVERLAY.classList.remove('active');
    })
    
    rootRightUp.OVERLAY.addEventListener('click', () => {
        rootRightUp.MODAL.classList.remove('active');
        rootRightUp.OVERLAY.classList.remove('active');
    })
    
    rootRightUp.FORM.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
    
        const record = {
            title: title,
            date: date,
            description: description,
            check: false
        }
        items.push(record)
        localStorage.setItem('items', JSON.stringify(items));
    
        rootRightUp.FORM.reset();
    
        updateTaskLen();
        updateTaskTable();
        //updateInComp(items);
    });
    
    rootRightUp.BTN_DEL.addEventListener('click', () => {
        localStorage.clear();
        items = [];
        updateTaskLen();
        updateTaskTable();
        updateTaskComp(items);
        //updateInComp(items);
    });
    
    window.addEventListener('storage', () => {
        items = JSON.parse(localStorage.getItem('items')) || [];
        updateTaskLen();
        updateTaskTable();
        //updateInComp(items);
    });

    rootRightUp.BTN_SEL.addEventListener('click', () => {
        items = JSON.parse(localStorage.getItem('items')) || [];
        
        items = items.filter(el => el.check !== true);
        localStorage.setItem('items', JSON.stringify(items));

        updateTaskLen()
        updateTaskTable();
        updateTaskComp(items);
        //updateInComp(items);
    });

});
