// Hackathon 2020 - Show me the notebook
// Sheri Gilley, July 2020

// If the page contains a div with id "notebook1" and class "aznb", look for the path.  
// If it's there then render the notebook from that path.

$(document).ready(function () {
  // if the page has the notebook1 id & aznb class, add header and process the notebook
  var nb = document.getElementById("notebook1");
  if (nb != null) {
    if (nb.className == "aznb") {
      // get the path to the notebook
      var path = nb.getAttribute("path");
      // if there is a path, we're good to go.  
      if (path != null) {
        addTitles(path);
        // call the aznb component to render the notebook
        // TODO - get these values from Key Vault 
        notebookResourceId  = "xxx";
        notebookResourceKey = "xxx";
        resourceUrl = "https://sdg-docfx.notebooks.azure.net";
        tenantId =  "xxx";
        alias = "sgilley";
        renderNb(path, notebookResourceId, notebookResourceKey, resourceUrl, tenantId); 
      }
    }
  }

  // Render the notebook.  
  // See https://devdiv.visualstudio.com/DevDiv/_git/AzureNotebooks?path=%2Fdocs%2F01-get-started.md&version=GTrelease-latest&_a=preview
  async function renderNb(path, nbResourceID, nbResourceKey, url, tenantId) {
    // Before hosting the Notebook component, you need to authorize with the notebook service by calling init() and passing in
    // the resource id and key  
    await AzureNotebooks.init({
      userHasGivenCookieConsent: true,
      getResourceIdAndKey: () =>
        Promise.resolve({
          notebookResourceId: nbResourceID,
          notebookResourceKey:  nbResourceKey
        }),
        resourceUrl: url
    });

    nb = await AzureNotebooks.loadNotebook({
      parentElementId: "notebook1",
      filePath: path,
      getNotebookStorageOptions: () =>
        Promise.resolve({
          requestOptions: null
        }),
      config: {
        showCellToolbar: false,
        showCellCreator: false,
        showCellBanner: false,
        showCommandBar: false,
        showStatusBar: false,
        enableDragDrop: false
        },
      // Provide internal user's info for telemetry logging purpose
      internalUserInfo: { alias: alias, domain: "localhost", tenantId: tenantId}
    });
  }

  //use this to add a title to the top and bottom of the notebook
  function addTitles(path) {

    // get the filename and its last folder (useful for context)
    var res = path.split("/");
    var fname = res[res.length - 2] + '/' + res[res.length - 1];
    fname = fname.replace(/%20/g, " ");

    // find link to the file instead of the raw version.  This code assumes it's from GitHub.  
    var link = path.replace("raw.githubusercontent.com", "github.com");
    link = link.replace("/master", "/blob/master");

    // form title text with a link to the notebook
    // var text = '<a href =' + '"' + link + '"' + 'target="_blank"> ' + fname + '</a>';
    var text = fname + '<a class="btn btn-primary pull-right" href="' + link + '" role="button target="_blank">Open in GitHub</a>'

    // create new divs for the notebook title - one for top, one for bottom
    var nbtitleTop = document.createElement('div');
    nbtitleTop.className = "aznbtitle";
    nbtitleTop.innerHTML = text;
    var nbtitleBot = nbtitleTop.cloneNode(true);

    // add styling for top and bottom (styling is different to round appropriate borders)
    nbtitleTop.classList.add("toptitle");
    nbtitleBot.classList.add("bottomtitle");

    // now add the title to the top and bottom
    nbParent = nb.parentNode;
    nbParent.insertBefore(nbtitleTop, nb);
    nbParent.insertBefore(nbtitleBot, nb.nextSibling);
  }
});