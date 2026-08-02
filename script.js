
// --- 1. アプリ設定リスト (ここだけを編集!) ---
// id: ボタンの ID
// screenId: 表示する画面の ID (画面要素の ID)
// label: ボタンに付けるラベル (必要なら)

// --- 1. 設定ファイル (ここだけいじれば追加可能) ---
        const appConfig = [
            { id: 'btn-find-replace-id', screenId: 'findReplace-screen', label: '検索・置換' },
            { id: 'btn-color-picker-id', screenId: 'color-picker-screen', label: 'カラーピッカー' },
            { id: 'btn-template-storage-id', screenId: 'template-storage-screen', label: 'テンプレート倉庫' },
            { id: 'btn-memoapp-id', screenId: 'memoApp-screen', label: 'メモ帳' },
            { id: 'btn-reset', screenId: null, action: 'resetAll', label: '全てリセット' },
            { id: 'btn-execute', screenId: null, action: 'doReplace', label: '実行' },
            { id: 'ts-reset-input', screenId: null, action: 'tsReset', label: 'リセット' },
            { id: 'btn-FnR-copy', screenId: null, action: 'copyResult', label: 'コピー' },
            { id: 'btnNewNote', screenId: null, action: 'createNewNote', label: 'メモ新規' },
            { id: 'btnDeleteNote', screenId: null, action: 'deleteCurrentNote', label: 'メモ削除' }
        ];

        // 許可されるアクション関数のリスト (セキュリティ用ホワイトリスト)
        const allowedActions = new Set([
            'resetAll',
            'doReplace',
            'copyResult',
            'tsReset',
            'createNewNote',
            'deleteCurrentNote'
        ]);

        // 許可される画面ID (XSS対策)
        const allowedScreens = new Set([
            ...appConfig.map(c => c.screenId).filter(Boolean),
            'menu-screen'
        ]);

        // --- 2. 共通処理関数 (セキュリティ強化版) ---

        function showScreen(screenName) {
            // 1. idの前後にスペースなど余計なものあれば削除
            screenName = screenName.trim();
            
            // 2. セキュリティチェック（許可された画面か確認）
            if (!allowedScreens.has(screenName)) {
                console.warn(`[Security] Unauthorized screen access blocked: ${screenName}`);
                return;
            }
            
            // 3. 背景の切り替え（Ocean と Stars）
            const ocean = document.querySelector('.ocean');
            const stars = document.querySelector('.stars');
            const firefly = document.querySelector('.firefly-input');

            if (screenName === 'menu-screen') {
                if (ocean) ocean.style.display = 'block';
                if (stars) stars.style.display = 'none';
            } else {
                if (ocean) ocean.style.display = 'none';
                if (stars) stars.style.display = 'block';
            }

            // 4. 全ての画面を隠す
            allowedScreens.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

            // 5. 指定された画面を取得して表示
            const target = document.getElementById(screenName);
            
            if (target) {
                // 画面が見つかった場合：表示
                target.style.display = 'flex';
                
                // フォーカス処理（必要に応じて）
                if (screenName === 'findReplace-screen') {
                    document.activeElement?.blur();
                }
                
                // 成功ログ（デバッグ用）
                console.log(`[Success] Screen displayed: ${screenName}`);
            } else {
                // 画面が見つからなかった場合：エラーログ
                console.error(`[Error] Screen not found: ${screenName}`);
                console.error(`Allowed screens: ${Array.from(allowedScreens).join(', ')}`);
            }
        }
        function goToMenu() {
            showScreen('menu-screen');
        }

        // --- 3. 自動イベント登録 (最適化版) ---
        document.addEventListener('DOMContentLoaded', () => {
            
            // A. 共通メニューボタン (既存機能)
            document.querySelectorAll('.goToMenu-btn').forEach(btn => {
                btn.addEventListener('click', goToMenu);
            });


            // C. 設定ベースの自動登録 (ここがメイン)
            appConfig.forEach(config => {
                const btn = document.getElementById(config.id);
                if (!btn) return;

                btn.addEventListener('click', () => {
                    // ① アクション実行 (セキュリティチェック付き)
                    if (config.action && allowedActions.has(config.action)) {
                        const func = window[config.action];
                        if (typeof func === 'function') {
                            func();
                            return;
                        }
                    }

                    // ② 画面遷移
                    if (config.screenId) {
                        showScreen(config.screenId);
                    }
                });
            });
        });
            

            
    // --- 🔍検索&置換 ---
        function doReplace() {
            const findText = document.getElementById('find').value;
            const replaceText = document.getElementById('replace').value;
            const text = document.getElementById('yourtext').value;
            const errorMsg = document.getElementById('error-msg');
            const resultBox = document.getElementById('result');
            if (!findText) {
                errorMsg.style.display = 'block';
                return;
            }
            errorMsg.style.display = 'none';
            // 検索機能のバグ防止。特殊文字を「エスケープ（文字として扱うように）」して、検索機能を安定。DoS 攻撃の防止などに間接的に役立つ。
            const escapedFind = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');               
            const regex = new RegExp(escapedFind, 'g');
            const newText = text.replace(regex, replaceText);
            resultBox.textContent = newText;
        }
        function resetAll() {
            document.getElementById('find').value = '';
            document.getElementById('replace').value = '';
            document.getElementById('yourtext').value = '';
            document.getElementById('result').textContent = 'ここに結果が表示されます';
            document.getElementById('error-msg').style.display = 'none';
        }
        function copyResult() {
            const resultText = document.getElementById('result').textContent;
            navigator.clipboard.writeText(resultText).then(() => {
                // 一時的なフィードバック（アラートはユーザー体験を妨げる場合があるので、今回は省略または簡易表示）
                const btn = document.getElementById('btn-FnR-copy');
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

    /* 🎨カラーピッカー色見本＆ダウンロード */
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

            let currentHex = '777'; // 🌟カラーピッカーの初期値

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
            downloadBtn.textContent = "ダウンロード中...";
            setTimeout(() => {
                downloadBtn.textContent = originalText;
            }, 2000);
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
    

    /* 📦コードテンプレート */
    // データ管理
    let templates = JSON.parse(localStorage.getItem('myTemplates')) || [];
    
    // DOM 要素
    const titleInput = document.getElementById('title');
    const codeInput = document.getElementById('code');
    const addBtn = document.getElementById('add-template');
    
    const listSection = document.getElementById('list-section');
    const templateList = document.getElementById('template-list');
    const deleteSelectedBtn = document.getElementById('delete-selected-btn');
    const emptyMsg = document.getElementById('empty-msg');
    
    const displayArea = document.getElementById('code-display-area');
    const displayTitle = document.getElementById('display-title');
    const codeText = document.getElementById('code-text');
    const copyBtn = document.getElementById('ct-copy-btn-id');
    const closeDisplayBtn = document.getElementById('close-display');
    
    const telling = document.getElementById('telling-id');

    // 初期化
    renderList();

    // テンプレート追加機能
    addBtn.addEventListener('click', () => {
        const t = titleInput.value.trim();
        const c = codeInput.value.trim();

        if (t && c) {
            templates.push({ title: t, code: c, id: Date.now() });
            localStorage.setItem('myTemplates', JSON.stringify(templates));
            
            titleInput.value = '';
            codeInput.value = '';
            
            renderList();
        } else {
            alert('タイトルとコードを入力してください！');
        }
    });
    
    //インプットのリセット
    function tsReset() {
        document.getElementById('title').value = '';
        document.getElementById('code').value = '';
    }
    
    // 削除ボタンの状態更新
    function updateDeleteButtonState() {
        const checkboxes = document.querySelectorAll('.template-item input[type="checkbox"]:checked');
        deleteSelectedBtn.disabled = checkboxes.length === 0;
    }

    // リスト描画関数
    function renderList() {
        templateList.innerHTML = '';
        
        if (templates.length === 0) {
            templateList.style.display = 'none';
            emptyMsg.style.display = 'block';
            deleteSelectedBtn.disabled = true;
            return;
        }

        templateList.style.display = 'block';
        emptyMsg.style.display = 'none';

        templates.forEach((item) => {
            const li = document.createElement('li');
            li.className = 'template-item';
            
            // チェックボックス
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.id = item.id;
            checkbox.addEventListener('change', updateDeleteButtonState);

            // コンテンツ（クリックで表示）
            const content = document.createElement('div');
            content.className = 'template-content';
            content.innerHTML = `
                <span class="template-title">${escapeHtml(item.title)}</span>
                <span class="template-preview">${escapeHtml(item.code.substring(0, 40))}...</span>
            `;
            
            // クリックイベント（コード表示）
            content.addEventListener('click', () => {
                showCode(item.title, item.code);
            });

            // 個別削除ボタン
            const delBtn = document.createElement('button');
            delBtn.className = 'delete-single-btn';
            delBtn.innerHTML = '🗑️';
            delBtn.title = 'この 1 つを削除';
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // コンテンツクリックを防止
                if (confirm(`「${item.title}」を削除しますか？`)) {
                    templates = templates.filter(t => t.id !== item.id);
                    localStorage.setItem('myTemplates', JSON.stringify(templates));
                    renderList();
                }
            });

            li.appendChild(checkbox);
            li.appendChild(content);
            li.appendChild(delBtn);
            templateList.appendChild(li);
        });

        updateDeleteButtonState();
    }

    // 選択したものを一括削除
    deleteSelectedBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.template-item input[type="checkbox"]:checked');
        if (checkboxes.length === 0) return;

        if (!confirm(`${checkboxes.length}件のテンプレートを削除します。よろしいですか？`)) return;

        const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.id));
        
        templates = templates.filter(t => !idsToDelete.includes(t.id));
        localStorage.setItem('myTemplates', JSON.stringify(templates));
        
        renderList();
    });

    // コード表示機能
    function showCode(title, code) {
        displayTitle.textContent = title;
        codeText.textContent = code; // XSS 対策: textContent
        displayArea.style.display = 'block';
        displayArea.scrollIntoView({ behavior: 'smooth' });
    }

    // 表示閉じる
    closeDisplayBtn.addEventListener('click', () => {
        displayArea.style.display = 'none';
    });

    // コピー機能
    copyBtn.addEventListener('click', () => {
        const text = codeText.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showTelling();
        }).catch(err => {
            console.error('コピー失敗', err);
            alert('コピーに失敗しました');
        });
    });

    // トースト通知
    function showTelling() {
        telling.style.opacity = '1';
        setTimeout(() => {
            telling.style.opacity = '0';
        }, 2000);
    }

    // XSS 対策用エスケープ関数
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    /* 📝一時メモ帳 */
        // 状態管理
        let notes = [];
        let currentNoteId = null;
        const STORAGE_KEY = 'advancedDarkNotes';

        // DOM 要素
        const noteListEl = document.getElementById('noteList');
        const noteTitleInput = document.getElementById('noteTitle');
        const noteArea = document.getElementById('noteArea');
        const saveStatusEl = document.getElementById('saveStatus');
        const charCountEl = document.getElementById('charCount');
        const btnNewNote = document.getElementById('btnNewNote');
        const memobtnSelectAll = document.getElementById('memo-btnSelectAll');
        const btnDeleteNote = document.getElementById('btnDeleteNote');
        const sidebar = document.getElementById('sidebar');
        const mobileToggle = document.getElementById('mobileToggle');
        const btnQuickClear = document.getElementById('btn-quick-clear');

        // 初期化
        window.addEventListener('load', () => {
            loadNotes();
            if (notes.length === 0) {
                createNewNote();
            } else {
                selectNote(notes[0].id);
            }
        });

        // メモの読み込み
        function loadNotes() {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                notes = JSON.parse(stored);
            }
            renderNoteList();
        }

        // メモの保存
        function saveNotes() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        }

        // 新しいメモの作成
        function createNewNote() {
            const newNote = {
                id: Date.now().toString(),
                title: '新しいメモ',
                content: '',
                updated: Date.now()
            };
            notes.unshift(newNote);
            saveNotes();
            selectNote(newNote.id);
            renderNoteList();
            if (window.innerWidth <= 768) sidebar.classList.remove('open');
        }

        // メモの選択
        function selectNote(id) {
            currentNoteId = id;
            const note = notes.find(n => n.id === id);
            
            if (note) {
                noteTitleInput.value = note.title;
                noteArea.value = note.content;
                updateCharCount();
                updateStatus('保存済み');
                
                // UI 更新
                document.querySelectorAll('.note-item').forEach(el => el.classList.remove('active'));
                const activeItem = document.querySelector(`.note-item[data-id="${id}"]`);
                if (activeItem) activeItem.classList.add('active');
            }
        }

        // メモの削除
        function deleteCurrentNote() {
            if (!currentNoteId) return;
            if (confirm('このメモを削除しますか？')) {
                notes = notes.filter(n => n.id !== currentNoteId);
                saveNotes();
                
                if (notes.length > 0) {
                    selectNote(notes[0].id);
                } else {
                    createNewNote();
                }
                renderNoteList();
            }
        }

        // リストの描画
        function renderNoteList() {
            noteListEl.innerHTML = '';
            notes.forEach(note => {
                const item = document.createElement('div');
                item.className = `note-item ${note.id === currentNoteId ? 'active' : ''}`;
                item.dataset.id = note.id;

                const title = note.title || '無題';
                const preview = note.content.substring(0, 30) + (note.content.length > 30 ? '...' : '') || '本文なし';

                // テキストとして設定（XSS 防止）
                const titleEl = document.createElement('div');
                titleEl.className = 'note-item-title';
                titleEl.textContent = title;

                const previewEl = document.createElement('div');
                previewEl.className = 'note-item-preview';
                previewEl.textContent = preview;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'note-item-delete';
                deleteBtn.textContent = '×';
                deleteBtn.setAttribute('aria-label', 'メモを削除');

                // イベントリスナーを追加（innerHTML 内で onclick しない）
                item.addEventListener('click', (e) => {
                    if (!deleteBtn.contains(e.target)) {
                        selectNote(note.id);
                    }
                });

                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                });

                item.appendChild(titleEl);
                item.appendChild(previewEl);
                item.appendChild(deleteBtn);
                noteListEl.appendChild(item);
            });
        }

        // 特定のメモの削除（リストから直接）
        function deleteNote(id) {
            const note = notes.find(n => n.id === id);
            if (confirm(`${note?.title || 'メモ'}を削除しますか？`)) {
                notes = notes.filter(n => n.id !== id);
                saveNotes();

                if (currentNoteId === id) {
                    if (notes.length > 0) {
                        selectNote(notes[0].id);
                    } else {
                        createNewNote();
                    }
                } else {
                    renderNoteList();
                }
                renderNoteList();
            }
        }
        // 更新処理
        function updateCurrentNote() {
            if (!currentNoteId) return;
            
            const note = notes.find(n => n.id === currentNoteId);
            if (note) {
                note.title = noteTitleInput.value || '無題';
                note.content = noteArea.value;
                note.updated = Date.now();
                
                // リストの順序更新（更新順）
                notes.sort((a, b) => b.updated - a.updated);
                
                saveNotes();
                renderNoteList();
                updateCharCount();
                updateStatus('保存中...');
                
                setTimeout(() => {
                    updateStatus('保存完了');
                    setTimeout(() => updateStatus('保存済み'), 1500);
                }, 300);
            }
        }

        // ステータス更新
        function updateStatus(msg) {
            saveStatusEl.textContent = msg;
            if (msg === '保存完了') {
                saveStatusEl.style.color = '#4caf50';
            } else if (msg === '保存中...') {
                saveStatusEl.style.color = 'var(--accent-color)';
            } else {
                saveStatusEl.style.color = 'var(--text-secondary)';
            }
        }

        // 文字数カウント更新
        function updateCharCount() {
            const count = noteArea.value.length;
            charCountEl.textContent = `${count} 文字`;
        }

        // ステータス更新（CSP 対策：クラス切り替えに変更）
        function updateStatus(msg) {
            saveStatusEl.textContent = msg;
            
            // クラスをリセット
            saveStatusEl.classList.remove('status-success', 'status-saving', 'status-default');

            if (msg === '保存完了') {
                saveStatusEl.classList.add('status-success');
            } else if (msg === '保存中...') {
                saveStatusEl.classList.add('status-saving');
            } else {
                saveStatusEl.classList.add('status-default');
            }
        }

        // Toast 通知機能（CSP 対策：クラスベースに修正）
        function showToast(message) {
            // 既存の Toast があるなら削除（重複防止）
            const existingToast = document.querySelector('.toast-message');
            if (existingToast) existingToast.remove();

            const toast = document.createElement('div');
            toast.className = 'toast-message';
            toast.textContent = message; // XSS 対策で textContent を使用
            
            document.body.appendChild(toast);
            
            // フェードイン（アニメーション用）
            requestAnimationFrame(() => {
                toast.classList.add('toast-show');
            });

            // 2 秒後に消す
            setTimeout(() => {
                toast.classList.remove('toast-show');
                // アニメーションが終わってから DOM から削除
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        }

        // イベントリスナーの設定
        // タイトルや内容が変わったら自動保存
        noteTitleInput.addEventListener('input', updateCurrentNote);
        noteArea.addEventListener('input', updateCurrentNote);

    
        // 全選択ボタンのイベントリスナー
        memobtnSelectAll.addEventListener('click', () => {
        noteArea.select();
        updateStatus('全選択完了');
        });

        // 選択範囲コピーボタンのイベントリスナー
        const memobtnCopySelection = document.getElementById('memobtnCopySelection');
        memobtnCopySelection.addEventListener('click', async () => {
        // 現在の選択範囲を取得
        const selectedText = window.getSelection().toString();

        if (!selectedText) {
            updateStatus('選択されたテキストがありません');
            showToast('選択範囲がありません');
            return;
        }

        try {
            await navigator.clipboard.writeText(selectedText);
            updateStatus('選択範囲コピー完了');
            setTimeout(() => updateStatus('保存済み'), 1500);
        } catch (err) {
            console.error('コピーに失敗しました:', err);
            updateStatus('コピーに失敗しました');
            showToast('クリップボードコピーに失敗しました');
        }
        });
        // クイッククリアボタン（バグ修正版）
        btnQuickClear.addEventListener('click', () => {
            if (!currentNoteId) return;
            if (noteArea.value === '') return; // 空なら何もしない

            // 1. 画面を空にする
            noteArea.value = '';
            
            // 2. データを空にする（ここが重要！）
            const note = notes.find(n => n.id === currentNoteId);
            if (note) {
                note.content = '';
                note.updated = Date.now();
                // 保存とリスト更新を呼ぶ
                saveNotes();
                renderNoteList(); // リストのプレビューも更新
                updateCharCount();
                
                // ステータス更新
                updateStatus('保存完了');
                setTimeout(() => updateStatus('保存済み'), 1500);
                
                showToast('内容を消去しました');
            }
        });

        // モバイル用サイドバー切り替え
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // サイドバーの外をクリックしたら閉じる（モバイル用）
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target) && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            }
        });


