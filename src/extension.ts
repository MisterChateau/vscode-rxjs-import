'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Document = vscode.TextDocument;
import Position = vscode.Position;
import Range = vscode.Range;
import Selection = vscode.Selection;
import TextDocument = vscode.TextDocument;
import window = vscode.window;
import TextEditor = vscode.TextEditor;
import workspace = vscode.workspace;

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.rxImport', async () => {
        if (!window.activeTextEditor) {
            throw new Error('No active file opened');
        }
        
        const editor = window.activeTextEditor;
        const document = editor.document;
        const selection =  editor.selection;

        const selectedText = getSelection(editor, document, selection);
        const path = await getPath(selectedText, workspace.rootPath);
    });

    context.subscriptions.push(disposable);
}

async function getPath(filename: string, rootPath: string) {
    return workspace.findFiles(`**/node_modules/rxjs/**/${filename}.js`, '**/node_modules/**/node_modules/**')
}

function getSelection(textEditor: TextEditor, document: TextDocument, selection: Selection) {
    const positionRange = new Range(
        new Position(selection.start.line, selection.start.character),
        new Position(selection.end.line, selection.end.character)
    )
    return document.getText(positionRange);
}

// this method is called when your extension is deactivated
export function deactivate() {
}