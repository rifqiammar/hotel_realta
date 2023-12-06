npm install --save-dev sequelize-cli

npx sequelize-cli init

npx sequelize-cli db:create

<!-- Association Migration -->

npx sequelize-cli migration:generate --name add-associations

<!-- Stock_photo -->

npx sequelize-cli model:generate --name stock_photo --attributes spho_thumbnail_filename:string,spho_photo_filename:string,spho_primary:boolean,spho_url:string,spho_stock_id:integer

<!-- Stocks -->

npx sequelize-cli model:generate --name kos --attributes stock_name:string,stock_description:string,stock_quantity:smallint,stock_reorder_point:smallint,stock_used:smallint,stock_scrap:smallint,stock_size:string,stock_color:string

<!-- Vendor -->

<!-- Stock_detail -->

<!-- Vendor_product -->

<!-- purchase_order_header -->

<!-- purchase_order_detail -->

<!-- Assosiation -->

Stocks --> Stock_photo
stock.hasMany(stock_photo)
stock_photo.belongsTo(stocks)

      stock.hasMany(models.stock_photo, { foreignKey: "stockId" });

<!-- Schema -->
