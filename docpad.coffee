# Define the Configuration
docpadConfig = {

  documentsPaths: [
    'documents'
    'scss']

  environments:
    development:
      templateData:
        site:
          url: "http://localhost:9778"
    production:
      templateData:
        site:
          url: "http://www.smartliving.io"
    staging:
      templateData:
        site:
          url: "https://dl.dropboxusercontent.com/u/62554239/veeam"

  plugins:
    nodesass:
      neat: true
      outputStyle: 'compressed'
      precision: 3
      debugInfo: 'normal'
      includePaths: [__dirname + "/src/documents/css"]
}

# Export the Configuration
module.exports = docpadConfig