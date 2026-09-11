const dateInput = document.getElementById("date");
const searchButton = document.getElementById("searchButton");
const randomButton = document.getElementById("randomButton");
const result = document.getElementById("result");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

// 月を追加
for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i + "月";
    monthSelect.appendChild(option);
}

// 日を追加
for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i + "日";
    daySelect.appendChild(option);
}
let anniversaries = [];

// CSVを読み込む
fetch("anniversaries.csv")
    .then(response => response.text())
    .then(data => {

        const lines = data.trim().split("\n");

        // 1行目は見出しなので飛ばす
        for (let i = 1; i < lines.length; i++) {

            const columns = lines[i].split(",");

            anniversaries.push({
                month: Number(columns[0]),
                day: Number(columns[1]),
                name: columns[2],
                description: columns[3]
            });
        }

        console.log(anniversaries);
    });

// 日付検索
searchButton.addEventListener("click", function() {

    const month = monthSelect.value;
    const day = daySelect.value;

    if (month === "" || day === "") {
        result.textContent = "月と日を選んでください！";
        return;
    }

    const found = anniversaries.filter(function(item) {
        return item.month === Number(month) &&
               item.day === Number(day);
    });

    if (found.length === 0) {
        result.textContent = "この日の記念日は見つかりませんでした。";
        return;
    }

    const random = found[Math.floor(Math.random() * found.length)];

    result.innerHTML = `
    <strong>${random.name}</strong>
`;
});

randomButton.addEventListener("click", function() {

    if (anniversaries.length === 0) {
        result.textContent = "記念日データを読み込んでいます……";
        return;
    }

    const random = anniversaries[
        Math.floor(Math.random() * anniversaries.length)
    ];

    result.innerHTML = `
        <strong>${random.month}月${random.day}日<br>${random.name}</strong>
    `;
});
