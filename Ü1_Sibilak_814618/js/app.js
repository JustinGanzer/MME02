/**
 * Created by Justin on 05-Apr-16.
 */

/**
 * This function is called every time the document changes its state and
 * is executed once it matches "complete".
 */
document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
        alert("Dom has loaded and Vicent may code here if he wishes to do so");
    }
}
