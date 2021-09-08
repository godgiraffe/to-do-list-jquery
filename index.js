let globalItemKey = 1;
            
$(".add__icon").click(function(){
    addWaitItem();
})

$(".add__input").keyup(function(event){
    // listen "Enter Event"
    if( event.keyCode === 13 ) {
        addWaitItem();
    }
})


function addWaitItem(){
    const addValue = $(".add__input").val();
    if( addValue === '' ){
        alert("請輸入待辦事項");
        return false;
    }
    const element =  createWaitItem(globalItemKey, addValue);
    $(".wait").append(element);
    globalItemKey++;
    $(".add__input").val("");
}


function addDoneItem(waitItem){
    const findClass = ".wait__item";
    const itemID = getItemID(waitItem, findClass);
    const itemValue = getItemValue(waitItem, findClass);

    const element = createDoneItem(itemID, itemValue);
    $(".done").append(element);

    delItem(waitItem, findClass);
}

function getItemID(element, findClass){
    const itemID = $(element).closest(findClass).get(0).id.split('__').pop();
    return itemID;
}

function getItemValue(element, findClass){
    const itemValue = $(element).closest(findClass).find(findClass + "__text__input").get(0).value;
    return itemValue;
}

function editItem(element){
    const waitItemElement = $(element).closest(".wait__item");
    const modifyInputElement = waitItemElement.children(".wait__item__text").find(".wait__item__text__input").get(0);
    // switch display block
    waitItemElement.children(".wait__item__icons__modified").css('display', 'flex');
    waitItemElement.children(".wait__item__icons").css('display', 'none');

    $(modifyInputElement).prop('disabled', false).focus();
}

function doEditItem(element){

}

function delItem(element, findClass){
    $(element).closest(findClass).get(0).remove()
}

function createWaitItem(itemKey, itemValue){
    const waitItem = 
    '<div class="wait__item"  id="wait__item__key__' + itemKey + '">' +
        '<div class="wait__item__text">' +
            '<input type="text" disabled="disaled" class="wait__item__text__input" value="' + itemValue + '">' +
        '</div>' +
        '<div class="wait__item__icons">' +
            '<div class="wait__item__icons__modify">' +
                '<ion-icon size="large" name="create-outline" onClick="editItem(this)"></ion-icon>' +
            '</div>' +
            '<div class="wait__item__icons__trash"  onClick="delItem(this, \'.wait__item\')">' +
                '<ion-icon size="large" name="trash-outline"></ion-icon>' +
            '</div>' +
            '<div class="wait__item__icons__done" onClick="addDoneItem(this)">' +
                '<ion-icon size="large" name="checkmark-outline"></ion-icon>' +
            '</div>' +
        '</div>' +
    '</div>';
    return waitItem;
}

function createDoneItem(itemKey, itemValue){
    const doneItem =
    '<div class="done__item" id="done__item__key__' + itemKey + '">' +
        '<div class="done__item__text">' + itemValue + '</div>' +
        '<div class="done__item__icons">' +
            '<div class="done__item__icons__trash"  onClick="delItem(this, \'.done__item\')">' +
                '<ion-icon size="large" name="trash-outline"></ion-icon>' +
            '</div>' +
            '<div class="done__item__icons__done">' +
                '<ion-icon size="large" name="checkmark-circle-outline"></ion-icon>' +
            '</div>' +
        '</div>' +
    '</div>';
    return doneItem;
}