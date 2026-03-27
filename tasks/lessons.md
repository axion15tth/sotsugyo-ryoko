# Lessons

## Project

- セッション開始時に、作業ディレクトリの中身と `git` 管理ルートが一致しているかを先に確認する。
- `zsh` で `gh api -f source[branch]=...` のような引数を渡すときは、`'source[branch]=main'` のようにクォートする。
- 中断後に再開するときは、未完コマンドの副作用を `git status` と実行プロセスで確認してから次に進む。
