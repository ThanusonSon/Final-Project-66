function add(){
    sum = 1+1 ;
    return sum ;
}

function refaceWebPage() {
        // เมื่อหน้า report.html โหลดเสร็จ
        // รีเฟรชหน้า index.html
    window.location.href = 'report.html';
    console.log('Refacing หน้าเว็บอัตโนมัติ 1 ครั้ง');
}

// sum_a = add()
// console.log(sum_a)
// // if (sum_a == 2){
// //     refaceWebPage()
// // }

