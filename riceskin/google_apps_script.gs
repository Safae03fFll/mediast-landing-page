/**
 * =====================================================
 *  I'M FROM — Rice Skincare · Google Apps Script
 *  Réception et enregistrement des commandes
 * =====================================================
 *
 *  INSTRUCTIONS D'INSTALLATION :
 *  1. Ouvrez Google Sheets → créez un nouveau document
 *  2. Allez dans Extensions → Apps Script
 *  3. Supprimez le code existant et collez ce fichier entier
 *  4. Cliquez sur "Déployer" → "Nouveau déploiement"
 *  5. Type : Application Web
 *     Exécuter en tant que : Moi
 *     Accès : Tout le monde
 *  6. Copiez l'URL générée
 *  7. Dans src/data.js, remplacez GOOGLE_SHEET_URL par cette URL
 * =====================================================
 */

// Nom de la feuille où seront enregistrées les commandes
const SHEET_NAME = "Commandes";

/**
 * Reçoit les données GET depuis l'application React
 * Les données sont passées via le paramètre "data" (JSON stringifié)
 */
function doGet(e) {
  try {
    // Récupérer les données de la commande
    const rawData = e.parameter.data;
    
    if (!rawData) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Aucune donnée reçue" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const orderData = JSON.parse(rawData);
    const result = saveOrder(orderData);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: result }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("Erreur doGet: " + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Reçoit les données POST (mode no-cors)
 */
function doPost(e) {
  try {
    const rawData = e.postData ? e.postData.contents : (e.parameter ? e.parameter.data : null);
    
    if (!rawData) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Aucune donnée" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const orderData = JSON.parse(rawData);
    const result = saveOrder(orderData);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: result }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("Erreur doPost: " + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Enregistre une commande dans Google Sheets
 */
function saveOrder(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Créer la feuille si elle n'existe pas
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    setupHeaders(sheet);
  }
  
  // Si la feuille est vide, ajouter les en-têtes
  if (sheet.getLastRow() === 0) {
    setupHeaders(sheet);
  }

  // Ligne de données
  const row = [
    data.orderNumber || "",
    data.date || new Date().toLocaleString("fr-FR"),
    data.customer || "",
    data.email || "",
    data.phone || "",
    data.address || "",
    data.items || "",
    data.subtotal || "",
    data.shipping || "",
    data.total || "",
    data.payment || "",
    data.notes || "",
    "En cours", // Statut par défaut
  ];

  sheet.appendRow(row);
  
  // Formater la nouvelle ligne
  const lastRow = sheet.getLastRow();
  formatOrderRow(sheet, lastRow);
  
  // Envoyer un email de notification (optionnel)
  // sendNotificationEmail(data);
  
  Logger.log("Commande enregistrée: " + data.orderNumber);
  return lastRow;
}

/**
 * Configure les en-têtes de la feuille
 */
function setupHeaders(sheet) {
  const headers = [
    "N° Commande", "Date", "Client", "Email", "Téléphone",
    "Adresse", "Produits", "Sous-total (€)", "Livraison (€)",
    "Total (€)", "Paiement", "Notes", "Statut"
  ];
  
  sheet.appendRow(headers);
  
  // Mise en forme des en-têtes
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setBackground("#6B4F32")
    .setFontColor("white")
    .setFontWeight("bold")
    .setFontSize(10)
    .setHorizontalAlignment("center");
  
  // Largeurs des colonnes
  sheet.setColumnWidth(1, 130);  // N° Commande
  sheet.setColumnWidth(2, 150);  // Date
  sheet.setColumnWidth(3, 140);  // Client
  sheet.setColumnWidth(4, 200);  // Email
  sheet.setColumnWidth(5, 130);  // Téléphone
  sheet.setColumnWidth(6, 250);  // Adresse
  sheet.setColumnWidth(7, 300);  // Produits
  sheet.setColumnWidth(8, 100);  // Sous-total
  sheet.setColumnWidth(9, 100);  // Livraison
  sheet.setColumnWidth(10, 100); // Total
  sheet.setColumnWidth(11, 120); // Paiement
  sheet.setColumnWidth(12, 200); // Notes
  sheet.setColumnWidth(13, 100); // Statut
  
  // Figer la première ligne
  sheet.setFrozenRows(1);
}

/**
 * Formate une ligne de commande
 */
function formatOrderRow(sheet, rowNum) {
  const range = sheet.getRange(rowNum, 1, 1, 13);
  
  // Couleur alternée
  const bgColor = rowNum % 2 === 0 ? "#FAF6F0" : "white";
  range.setBackground(bgColor);
  
  // Bordures
  range.setBorder(true, true, true, true, true, true, "#EDE3D5", SpreadsheetApp.BorderStyle.SOLID);
  
  // Alignement du total
  sheet.getRange(rowNum, 10).setFontWeight("bold").setFontColor("#6B4F32");
  
  // Statut
  const statusCell = sheet.getRange(rowNum, 13);
  statusCell
    .setBackground("#FFF3CD")
    .setFontColor("#856404")
    .setHorizontalAlignment("center")
    .setFontWeight("bold");
}

/**
 * (Optionnel) Envoie un email de notification pour chaque nouvelle commande
 * Décommentez et configurez si souhaité
 */
/*
function sendNotificationEmail(data) {
  const ADMIN_EMAIL = "votre@email.com";
  
  const subject = `🛒 Nouvelle commande #${data.orderNumber} - ${data.total}€`;
  const body = `
    Nouvelle commande reçue !
    
    N° Commande: ${data.orderNumber}
    Client: ${data.customer}
    Email: ${data.email}
    Téléphone: ${data.phone}
    Adresse: ${data.address}
    
    Produits: ${data.items}
    
    Sous-total: ${data.subtotal}€
    Livraison: ${data.shipping}€
    Total: ${data.total}€
    
    Paiement: ${data.payment}
    Notes: ${data.notes}
  `;
  
  MailApp.sendEmail(ADMIN_EMAIL, subject, body);
}
*/

/**
 * Crée un menu personnalisé dans Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🌾 RiceSkin")
    .addItem("Initialiser les en-têtes", "initializeSheet")
    .addItem("Formater toutes les lignes", "formatAllRows")
    .addItem("Voir les statistiques", "showStats")
    .addToUi();
}

function initializeSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  sheet.clear();
  setupHeaders(sheet);
  SpreadsheetApp.getUi().alert("✓ Feuille initialisée avec succès !");
}

function formatAllRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  for (let i = 2; i <= lastRow; i++) {
    formatOrderRow(sheet, i);
  }
  SpreadsheetApp.getUi().alert("✓ Formatage appliqué à " + (lastRow - 1) + " commandes.");
}

function showStats() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() <= 1) {
    SpreadsheetApp.getUi().alert("Aucune commande enregistrée.");
    return;
  }
  const lastRow = sheet.getLastRow();
  const totals = sheet.getRange(2, 10, lastRow - 1, 1).getValues();
  const totalRevenue = totals.reduce((s, r) => s + parseFloat(r[0] || 0), 0);
  SpreadsheetApp.getUi().alert(
    `📊 Statistiques\n\n` +
    `Nombre de commandes : ${lastRow - 1}\n` +
    `Chiffre d'affaires total : ${totalRevenue.toFixed(2)}€\n` +
    `Panier moyen : ${(totalRevenue / (lastRow - 1)).toFixed(2)}€`
  );
}
