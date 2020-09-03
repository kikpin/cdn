
//应用实例

//1.数据
// let list1 = [{
//   name: "李四端",
//   age: "18",
//   score: "58",
//   balance: "82"
// }, {
//   name: "赵柯双",
//   age: "50",
//   score: "50",
//   balance: "90"
// }, {
//   name: "王花花",
//   age: "11",
//   score: "90",
//   balance: "20"
// }
// ];

//2.规则
// let struct = {
//   name: "姓名",
//   age: "年龄",
//   score: "分数",
//   balance: "余额"
// };

//3.渲染目标HTML
// let table = document.querySelector("table");

//4.启动函数，及其功能
// boot(table, struct, list1, {
//   delete: {
//     name: "删除",
//     action: function (tr) {
//       tr.parentElement.deleteRow(tr.rowIndex);
//     }
//   },
//   upDate: {
//     name: "8折后",
//     action: function (tr, it) {
//       let s = it.balance;
//       tr.cells[3].innerText = parseInt(s * 0.8);
//       tr.cells[3].style.color = "red";
//     }
//   },
//   hightLight: {
//     name: "高亮",
//     action: function (tr) {
//       let bg = window.getComputedStyle(tr).backgroundColor;
//       if (bg == "rgb(128, 128, 128)") {
//         tr.style.background = "rgb(255, 255, 255)";
//       } else {
//         tr.style.background = "rgb(128, 128, 128)";
//       }
//     }
//   },
//   up: {
//     name: "上移",
//     action: function (tr) {
//       console.dir("上一个：第" + parseInt(tr.rowIndex - 1) + "行" + tr.previousElementSibling);
//       console.dir("下一个：第" + parseInt(tr.rowIndex + 1) + "行" + tr.nextSibling);
//       console.dir(tr);
//     },
//   }
// });
//结束实例

//封装函数，暴露接口
;(function(){
  'use strict';
  window.kikyouTable = {
    boot()
  }

function boot(table, struct, arr, ops) {
  initTable(table);
  render(table, struct, arr, ops)
}
//初始化，生成空表头、表体、表脚
function initTable(table) {
  table.createTHead();
  table.createTBody();
  table.createTFoot();
}
//渲染表格
//开始
function render(table, struct, arr, ops) {
  renderTHead(table, struct, ops);
  renderTBody(table, struct, arr, ops);
}
//头
function renderTHead(table, struct, ops) {
  let thead = table.tHead;
  for (let key in struct) {
    let th = document.createElement("th");
    th.innerText = struct[key];
    thead.appendChild(th);
  };
  //操作栏
  if (ops) {
    let th = document.createElement("th");
    th.innerText = "操作";
    thead.appendChild(th);
  }
}
//体
function renderTBody(table, struct, arr, ops) {
  let tbody = table.tBodies[0];
  arr.forEach(it => {
    let tr = document.createElement("tr");
    let html = "";
    for (let key in struct) {
      html += `<td>${it[key] || "-"}</td>`;
    }
    //渲染操作栏
    if (ops) {
      let opsHtml = "";
      for (let key in ops) {
        opsHtml += `<button class = "${key}">${ops[key].name}</button>`;
      }
      html += `<td>${opsHtml}</td>`;
    }
    //结束
    tr.innerHTML = html;
    //插入文档后才能绑定事件
    //绑定操作栏事件
    if (ops) {
      for (let key in ops) {
        //当前行的操作，TBody渲染后整个表格
        tr
          .querySelector("." + `${key}`)
          .addEventListener("click", function () {
            //JSON内函数，小括号触发
            ops[key].action(tr, it);
          })
      }
    }
    //结束
    tbody.appendChild(tr);
  })
}
//渲染结束
})()