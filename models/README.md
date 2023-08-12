# To merge the models to a single bin file

## Linux Commandline

```
cat pytorch_model.bin_0* > pytorch_model.bin
```

### Removing the split files
```
rm -v pytorch_model.bin_0*
```

### Splitting a file
```
split -b 99M -d pytorch_model.bin pytorch_model.bin_
```

## 7-zip
To merge files split using the split utility using 7-zip, you can follow these steps:

- Open 7-zip.
- Click on the "File" menu and select "Add".
- In the "Add archive" dialog box, select the split files that you want to merge.
- Click on the "Open" button.
- In the "Archive name" field, enter the name of the merged file.
- In the "Compression method" drop-down list, select the compression method that you want to use.
- Click on the "OK" button.

7-zip will merge the split files and create a new file with the name that you specified.
