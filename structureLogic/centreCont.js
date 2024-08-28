
const TASKROW = document.getElementById('tasksRow');


function updateTaskComp(items){
    let comp = 0;
    items.forEach((el) => {
        if(el.check == true)
            {
                comp += 1;
            }
        });
        document.querySelector('.allComp').textContent = comp;
}
    
function updateTaskTable() {
        
    let items = JSON.parse(localStorage.getItem('items')) || [];

    TASKROW.innerHTML = `<tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>`;
    
    let tableRows = '';

    items.forEach((el, index) => {
        tableRows += `<tr>
                            <td>${el.date}</td>
                            <td>${el.title}</td>
                            <td style="display: flex;">
                                <button id="description-${index}" class="btn_des">Description</button>
                                <input id="checkbox-${index}" type="checkbox" ${el.check ? 'checked' : ''}>
                            </td>
                        </tr>`;
    });


    TASKROW.innerHTML += tableRows;

    items.forEach((el, index) => {
        const CHECK_BOX = document.getElementById(`checkbox-${index}`);
        const BTN_DES = document.getElementById(`description-${index}`);

        const RP_DOWN = document.querySelector('.rp_down'); 

        CHECK_BOX.checked = el.check;

        CHECK_BOX.addEventListener('click', (event) => {
            items[index].check = CHECK_BOX.checked;
            
            localStorage.setItem('items', JSON.stringify(items));

            updateTaskComp(items);
        });

        BTN_DES.addEventListener('click', () => {

            RP_DOWN.innerHTML = `
                <div class="rp_title">${items[index].title}</div>
                <div class="rp_date">${items[index].date}</div>
                <div class="rp_description">${items[index].description}</div>
            `;
        });
    });

}
document.addEventListener('DOMContentLoaded', () => {
    updateTaskTable();
});


export { updateTaskTable, updateTaskComp };