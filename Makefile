# Directories
TARGET_DIR = dist

# Binaries
WEBPACK = ./node_modules/.bin/webpack
WEBPACK_DEV_SERVER = ./node_modules/.bin/webpack-dev-server
STANDARD = ./node_modules/.bin/standard
NPM = npm

.PHONY: dist clean watch node_modules

build: $(TARGET_DIR)

clean:
	rm -rf $(TARGET_DIR)

static: index

index:
	mkdir -p $(TARGET_DIR)
	cp ./src/index.html $(TARGET_DIR)

lint: node_modules
	$(STANDARD)

watch: clean static
	$(WEBPACK_DEV_SERVER) --debug --devtool source-map --output-pathinfo --progress --watch --inline --content-base $(TARGET_DIR)/

$(TARGET_DIR): lint clean static
	$(WEBPACK) --optimize-minimize

node_modules:
	$(NPM) install
