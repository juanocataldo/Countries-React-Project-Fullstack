const { DataTypes, ENUM } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('country', {
    
    country_id: {
      type: DataTypes.STRING,
      allowNull:false,
      primaryKey: true      
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_flag:{
      type: DataTypes.STRING,
      allowNull: false
    },
    country_continent:{
      type: DataTypes.STRING,
      allowNull:false
    },
    country_capital:{
      type:DataTypes.STRING,
      allowNull:false
    },
    country_subregion:{
      type:DataTypes.STRING
    },
    country_area:{
      type:DataTypes.STRING
    },
    country_poblation:{
      type:DataTypes.STRING
    }
  },{
    createdAt: false,
    updatedAt: false,
  });


  sequelize.define('tourist_activity', {
    touact_id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true      
    },
    touact_name:{
      type: DataTypes.STRING      
    },
    touact_difficulty:{
      type: ENUM,
      values: ["1", "2", "3", "4", "5"]
      
    },
    touact_duration:{
      type: DataTypes.FLOAT      
    },
    touact_season:{
      type: DataTypes.STRING
    }
  })
};
