 

        //XSS対策
            document.addEventListener('DOMContentLoaded', () => {
        // 「メニューに戻る」ボタンの一括登録
            const menuButtons = document.querySelectorAll('.goToMenu-btn');
            menuButtons.forEach(button => {
                button.addEventListener('click', () => {
                // 共通の処理 (goToMenu 関数など)
                if (typeof goToMenu === 'function') {
                    goToMenu();
                }
                });
            });
            const btnCopy = document.getElementById('btn-copy');
            if (btnCopy) {
                btnCopy.addEventListener('click', () => {
                if (typeof copyResult === 'function') copyResult();
                });
            }
            });
        /*カラーピッカー色見本＆ダウンロード*/
            const btnColorPicker = document.getElementById('btn-color-picker-id');
            if (btnColorPicker) {
                btnColorPicker.addEventListener('click', () => {
                showScreen('color-picker');
                });
            }
        /* コード倉庫 */
            const btnCodeStorage = document.getElementById('btn-code-storage-id');
            if (btnCodeStorage) {
                btnCodeStorage.addEventListener('click', () => {
                showScreen('code-storage');
                });
            }

        //検索&置換ボタン
            const btnFindReplace = document.getElementById('btn-find-replace-id');
            if (btnFindReplace) {
                btnFindReplace.addEventListener('click', () => {
                showScreen('find-replace');
                });
            }
            const btnExecute = document.getElementById('btn-execute');
            if (btnExecute) {
                btnExecute.addEventListener('click', () => {
                if (typeof doReplace === 'function') doReplace();
                });
            }
            const btnReset = document.getElementById('btn-reset');
            if (btnReset) {
                btnReset.addEventListener('click', () => {
                if (typeof resetAll === 'function') resetAll();
                });
            }
            const btnCopy = document.getElementById('btn-copy');
            if (btnCopy) {
                btnCopy.addEventListener('click', () => {
                if (typeof copyResult === 'function') copyResult();
                });
            };
            

            
    // --- showScreen メニューの内外へ ---
    //アプリを増設した際の追加項目２つ。１．したのconst・none・elseif・function　２．CSSでdisplay:none;を。
        function showScreen(screenName) {
            const menuScreen = document.getElementById('menu-screen');
            const findReplaceScreen = document.getElementById('findReplace-screen');            const swapGameScreen = document.getElementById('swapGame-screen');
            const codeStorageScreen = document.getElementById('code-storage-screen');
            const colorPickerScreen = document.getElementById('color-picker-screen');
    // 全ての画面を隠す
            const screens = [menuScreen, findReplaceScreen, codeStorageScreen, colorPickerScreen];
            screens.forEach(screen => {
                if (screen) screen.style.display = 'none';
            });
            if (screenName === 'find-replace') {
                findReplaceScreen.style.display = 'flex';
        // 入力欄のフォーカスを外す（キーボードを閉じるため）
                document.activeElement.blur();
            }else if (screenName === 'code-storage') {
                codeStorageScreen.style.display = 'flex';
            }else if (screenName === 'color-picker') {
                colorPickerScreen.style.display = 'flex';
            }
        }
        function goToMenu() {
            document.getElementById('menu-screen').style.display = 'flex';
            document.getElementById('findReplace-screen').style.display = 'none';
            document.getElementById('code-storage-screen').style.display = 'none';
            document.getElementById('color-picker-screen').style.display = 'none';
        }
    // --- 検索&置換 ---
        function doReplace() {
            const findText = document.getElementById('find').value;
            const replaceText = document.getElementById('replace').value;
            const text = document.getElementById('text').value;
            const errorMsg = document.getElementById('error-msg');
            const resultBox = document.getElementById('result');
            if (!findText) {
                errorMsg.style.display = 'block';
                return;
            }
            errorMsg.style.display = 'none';
            // 検索機能のバグ防止。特殊文字を「エスケープ（文字として扱うように）」して、検索機能を安定。DoS 攻撃の防止などに間接的に役立つ。
            const escapedFind = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');               const regex = new RegExp(escapedFind, 'g');
            const newText = text.replace(regex, replaceText);
            resultBox.textContent = newText;
        }
        function resetAll() {
            document.getElementById('find').value = '';
            document.getElementById('replace').value = '';
            document.getElementById('text').value = '';
            document.getElementById('result').textContent = 'ここに結果が表示されます';
            document.getElementById('error-msg').style.display = 'none';
        }
        function copyResult() {
            const resultText = document.getElementById('result').textContent;
            navigator.clipboard.writeText(resultText).then(() => {
                // 一時的なフィードバック（アラートはユーザー体験を妨げる場合があるので、今回は省略または簡易表示）
                const btn = document.getElementById('btn-copy');
                const originalText = btn.textContent;
                btn.textContent = 'コピー完了！';
                btn.style.background = '#050';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '#070';
                }, 1000);
            }).catch(err => {
                console.error('コピー失敗:', err);
                alert('コピーに失敗しました');
            });
        }

    /* コード倉庫 */
            const allpairs = {
                "絵文字の周囲に影をつける": ` 
                HTML <span class="moon">🌙</span>
                CSS  .moon{
                    font-size: 1.7rem;
                    filter: drop-shadow(0 0 2px #333) drop-shadow(0 0 10px #ffdd00);
                    animation: glow 1s infinite alternate;
                    margin-bottom: 60px;
                }
                @keyframes glow {
                    from { text-shadow: 0 0 1px #baa800; }
                    to { text-shadow: 0 0 3px #333, 0 0 2px #333; }
                }`, 
                "XSS対策":`
                    HTML  
                    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">

                    HTMLにはボタンなどのonclickを外し、代わりにidをつける。
                    
                    JSの先頭にこれを書く。
                    document.addEventListener('DOMContentLoaded', () => {
                        
                    あとは各ボタンidについて下記のように書く。
                    const btnFindReplace = document.getElementById('btn-find-replace');
                    if (btnFindReplace) {
                        btnFindReplace.addEventListener('click', () => {
                        showScreen('find-replace');
                        });
                    }`,
                    "オフラインで動くサービスワーカー":`
                    🌟 ① script.jsの冒頭に埋め込む!

                    if ('serviceWorker' in navigator) {
                        window.addEventListener('load', () => {
                            navigator.serviceWorker.register('./sw.js')
                            .then(registration => {
                                console.log('SW registered: ', registration);
                            })
                            .catch(registrationError => {
                                console.log('SW registration failed: ', registrationError);
                            });
                        });
                        }

                    🌟 ② 下記をsw.jsとして保存。
                    const CACHE_NAME = 'v1';
                    const urlsToCache = [
                    './',
                    './index.html',
                    './style.css',
                    './script.js', 
                    './icon-192.png',
                    './icon-512.png'
                    ];

                    // インストール時：キャッシュにファイルを保存
                    self.addEventListener('install', event => {
                    event.waitUntil(
                        caches.open(CACHE_NAME)
                        .then(cache => {
                            return cache.addAll(urlsToCache);
                        })
                    );
                    });

                    // アクティブ時：古いキャッシュを削除
                    self.addEventListener('activate', event => {
                    event.waitUntil(
                        caches.keys().then(cacheNames => {
                        return Promise.all(
                            cacheNames.map(cacheName => {
                            if (cacheName !== CACHE_NAME) {
                                return caches.delete(cacheName);
                            }
                            })
                        );
                        })
                    );
                    });

                    // フェッチ時：オフラインでもキャッシュから返す
                    self.addEventListener('fetch', event => {
                    event.respondWith(
                        caches.match(event.request)
                        .then(response => {
                            // キャッシュにあったらそれを返す
                            if (response) {
                            return response;
                            }
                            // なかったらネットワークから取得
                            return fetch(event.request);
                        })
                    );
                    });`,
                    "PWA化":`
                    🌟 ① headタグに埋め込む
                    <!DOCTYPE html>
                    <html lang="ja">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>🐣試作品🐵</title>
                    <link rel="manifest" href="manifest.json">
                    <meta name="theme-color" content="#4B0082">
                    <link rel="icon" type="image/png" href="icon192.png">
                    <link rel="apple-touch-icon" href="icon192.png">

                    <script src="script.js" defer></script>
                    <link rel="stylesheet" href="style.css">

                </head>
                <body>

                </body>
                </html>

                🌟 ② manifest.jsonファイルを作り、下記を記載。
                {
                    "name": "アプリ起動時に現れるタイトル",
                    "short_name": "アプリアイコン下の表記",
                    "start_url": "index.html",
                    "display": "standalone",
                    "background_color": "#777",
                    "theme_color": "#000000",
                    "icons": [
                        {
                        "src": "icon192.png", 
                        "sizes": "192x192",
                        "type": "image/png"
                        },
                        {
                        "src": "icon512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                        }
                    ]
                }
                    `
            };

            const marketplace = document.getElementById('marketplace-id');
            const displayArea = document.getElementById('display-area-id');
            const actions = document.getElementById('actions');
            const toast = document.getElementById('toast');

        // 倉庫からボタンを生成
        for (const [emoji, code] of Object.entries(allpairs)) {
            const kokodakeBtn = document.createElement('button');
            kokodakeBtn.className = 'code-btn';
            kokodakeBtn.textContent = emoji;
            
            // 🔴 修正: onclick 代入を removeEventListener / addEventListener に変更
            // CSP 対策: インラインイベントハンドラを避ける
            kokodakeBtn.addEventListener('click', () => {
                showCode(emoji, code);
            });
            
            marketplace.appendChild(kokodakeBtn);
        }

        function showCode(emoji, code) {
            displayArea.style.display = 'block';
            if (actions) actions.style.display = 'flex';
            // ✅ 安全: textContent を使用（CSS コードも文字列として扱われる）
            displayArea.textContent = code;   
            
            // 画面をスクロールして表示エリアへ
            displayArea.scrollIntoView({ behavior: 'smooth' });
        }

        function copyCode() {
            const text = displayArea.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showToast();
            }).catch(err => {
                console.error('コピー失敗', err);
                alert('コピーに失敗しました');
            });
        }

        function showToast() {
            toast.style.opacity = '1';
            setTimeout(() => {
                toast.style.opacity = '0';
            }, 2000);
        }

    /* カラーピッカー色見本＆ダウンロード */
            const input = document.getElementById('colorInput');
            const preview = document.getElementById('preview');
            const errorMsg = document.getElementById('errorMsg');
            const rVal = document.getElementById('rVal');
            const gVal = document.getElementById('gVal');
            const bVal = document.getElementById('bVal');
            const saveBtn = document.getElementById('saveBtn');
            const savedList = document.getElementById('savedList');
            const colorPicker = document.getElementById('colorPicker');
            const widthInput = document.getElementById('width');
            const heightInput = document.getElementById('height');
            const canvas = document.getElementById('myCanvas');
            const ctx = canvas.getContext('2d');
            const downloadBtn = document.getElementById('downloadBtn');

            let currentHex = 'D17A00'; // 現在の有効な色（初期値）

    // --- 画像生成・ダウンロード機能 ---
        function generateImage() {
            const color = colorPicker.value;
            const width = parseInt(widthInput.value) || 1000;
            const height = parseInt(heightInput.value) || 1000;
            
            // キャンバスのサイズを設定
            canvas.width = width;
            canvas.height = height;
            
            // 単色で塗りつぶす
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);
            
            // キャンバスを表示（プレビュー用）
            canvas.style.display = 'block';
        }

        function downloadImage() {
            const link = document.createElement('a');
            link.download = `solid-color-${currentHex}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // ボタンフィードバック
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = "ダウンロード完了！";
            setTimeout(() => {
                downloadBtn.textContent = originalText;
            }, 1500);
        }

        // --- 色更新処理（手入力用） ---
        function updateColor() {
            let val = input.value.toUpperCase().replace(/[^0-9A-F]/g, ''); // 無効文字を自動削除
                    
        // 修正案：空文字の場合は現在の色を維持（または FF にリセット）
        if (val === '') {
            errorMsg.style.display = 'none';
            // 現在の色（または初期の白）を維持
            preview.style.backgroundColor = `#${currentHex}`; 
            colorPicker.value = `#${currentHex}`;
            
            // RGB 表示も現在の色に合わせて更新
            const r = parseInt(currentHex.substring(0, 2), 16);
            const g = parseInt(currentHex.substring(2, 4), 16);
            const b = parseInt(currentHex.substring(4, 6), 16);
            rVal.textContent = r.toString(16).padStart(2, '0').toUpperCase();
            gVal.textContent = g.toString(16).padStart(2, '0').toUpperCase();
            bVal.textContent = b.toString(16).padStart(2, '0').toUpperCase();
            
            generateImage();
            return;
        }
            // 0-9, A-F のみ許可（6桁以内）
            if (!/^[0-9A-F]{1,6}$/.test(val)) {
                errorMsg.style.display = 'block';
                return;
            }
            
            errorMsg.style.display = 'none';

            // 値が6桁になるまで0埋め
            let paddedVal = val.padEnd(6, '0');
            currentHex = paddedVal; // 現在の有効な色を更新
            
            // 色を適用
            preview.style.backgroundColor = `#${paddedVal}`;
            colorPicker.value = `#${paddedVal}`; // ピッカーも同期
            
            // 16進数を10進数に変換して表示（表示用）
            const r = parseInt(paddedVal.substring(0, 2), 16);
            const g = parseInt(paddedVal.substring(2, 4), 16);
            const b = parseInt(paddedVal.substring(4, 6), 16);

            rVal.textContent = r.toString(16).padStart(2, '0').toUpperCase();
            gVal.textContent = g.toString(16).padStart(2, '0').toUpperCase();
            bVal.textContent = b.toString(16).padStart(2, '0').toUpperCase();
            
            generateImage(); // 画像も更新
        }

    // --- ローカルストレージ機能 ---
        function loadSavedColors() {
            const saved = JSON.parse(localStorage.getItem('myColors') || '[]');
            savedList.innerHTML = '';
            saved.forEach(color => renderColorItem(color));
        }

        function renderColorItem(hex) {
            const li = document.createElement('li');
            li.className = 'saved-item';
            
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = `#${hex}`;
            
            const code = document.createElement('span');
            code.className = 'color-code';
            code.textContent = '#' + hex;
            
            const delBtn = document.createElement('button');
            delBtn.className = 'delete-btn';
            delBtn.textContent = '×';
            delBtn.onclick = (e) => {
                e.stopPropagation();
                deleteColor(hex);
            };

            li.onclick = () => {
                navigator.clipboard.writeText('#' + hex).then(() => {
                    code.textContent = 'コピー！';
                    setTimeout(() => {
                        code.textContent = '#' + hex;
                    }, 1000);
                });
            };
            
            li.appendChild(swatch);
            li.appendChild(code);
            li.appendChild(delBtn);
            savedList.appendChild(li);
        }

        // 色の削除
        function deleteColor(hex) {
            let saved = JSON.parse(localStorage.getItem('myColors') || '[]');
            saved = saved.filter(c => c !== hex);
            localStorage.setItem('myColors', JSON.stringify(saved));
            loadSavedColors();
        }

        // 色を保存
        function saveCurrentColor() {
            if (!errorMsg.style.display || errorMsg.style.display === 'none') {
                let saved = JSON.parse(localStorage.getItem('myColors') || '[]');
                if (!saved.includes(currentHex)) {
                    saved.unshift(currentHex); // 先頭に追加
                    localStorage.setItem('myColors', JSON.stringify(saved));
                    loadSavedColors();
                }
            }
        }

    // --- イベントリスナー設定 ---
        
        // ピッカー変更時
        colorPicker.addEventListener('input', (e) => {
            const val = e.target.value.substring(1); // # を除く
            input.value = val;
            updateColor();
        });

        // 手入力変更時
        input.addEventListener('input', updateColor);
        
        // サイズ変更時（画像再生成）
        widthInput.addEventListener('input', generateImage);
        heightInput.addEventListener('input', generateImage);

        // 保存ボタン
        saveBtn.addEventListener('click', saveCurrentColor);
        
        // ダウンロードボタン
        downloadBtn.addEventListener('click', downloadImage);

        // --- 初期化 ---
        loadSavedColors();
        updateColor(); // 初期色設定と画像生成
