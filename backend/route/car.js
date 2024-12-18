const express = require("express");
const { CarModel } = require("../model/car");
const { TravelsModel } = require("../model/travels");
const { default: mongoose } = require("mongoose");
const carRoutes = express.Router();

carRoutes.get("/get-all-cars",async(req,res)=>{
  try {
 

//   const carData = await CarModel.insertMany([
//     {
//       "no_plate": "ABC123",
//       "image": "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80",
//       "type": "Sedan",
//       "price": 25000,
//       "rating": 4.5
//     },
//     {
//       "no_plate": "DEF456",
//       "image": "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960",
//       "type": "SUV",
//       "price": 30000,
//       "rating": 4.7
//     },
//     {
//       "no_plate": "GHI789",
//       "image": "https://imgd.aeplcdn.com/370x208/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80",
//       "type": "Hatchback",
//       "price": 18000,
//       "rating": 4.3
//     },
//     {
//       "no_plate": "JKL012",
//       "image": "https://i.pinimg.com/736x/d2/6d/2a/d26d2aab2ff63cb48b3a91b0e8e0aa55.jpg",
//       "type": "Convertible",
//       "price": 35000,
//       "rating": 4.6
//     },
//     {
//       "no_plate": "MNO345",
//       "image": "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/rolls_royce_phantom_top_10.jpg?itok=XjL9f1tx",
//       "type": "Coupe",
//       "price": 45000,
//       "rating": 4.8
//     },
//     {
//       "no_plate": "PQR678",
//       "image": "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fbig%2Fhyundai%2Fcreta%2Fhyundai-creta.jpg%3Fv%3D92&w=3840&q=75",
//       "type": "Wagon",
//       "price": 20000,
//       "rating": 4.2
//     },
//     {
//       "no_plate": "STU901",
//       "image": "https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg",
//       "type": "Sedan",
//       "price": 27000,
//       "rating": 4.4
//     },
//     {
//       "no_plate": "VWX234",
//       "image": "https://cdn.motor1.com/images/mgl/mrz1e/s1/4x3/coolest-cars-feature.webp",
//       "type": "SUV",
//       "price": 32000,
//       "rating": 4.6
//     },
//     {
//       "no_plate": "YZA567",
//       "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCjdb91Ev2ejVA_IYJHac0zvytyDhWkKw3Zg&s",
//       "type": "Hatchback",
//       "price": 19000,
//       "rating": 4.1
//     },
//     {
//       "no_plate": "BCD678",
//       "image": "https://images.unsplash.com/photo-1588502215047-3e5cdb6c518d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDdfbGFuZGJ1cnB8ZW58MHx8fDE2NjgxNTg4MTg&ixlib=rb-1.2.1&q=80&w=400",
//       "type": "Convertible",
//       "price": 37000,
//       "rating": 4.7
//     },
//     {
//       "no_plate": "EFG789",
//       "image": "https://imageio.forbes.com/specials-images/imageserve/5f962df3991e5636a2f68758/0x0.jpg?format=jpg&crop=812,457,x89,y103,safe&height=900&width=1600&fit=bounds",
//       "type": "Coupe",
//       "price": 42000,
//       "rating": 4.8
//     },
//     {
//       "no_plate": "HIJ012",
//       "image": "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20_Modelpc.png",
//       "type": "Wagon",
//       "price": 21000,
//       "rating": 4.2
//     },
//     {
//       "no_plate": "JKL345",
//       "image": "https://www.usnews.com/cmsmedia/f5/4b/efa92f4c4dcebb2af996dfc4c01f/2023-lucid-air-1.jpg",
//       "type": "Sedan",
//       "price": 26000,
//       "rating": 4.4
//     },
//     {
//       "no_plate": "LMN456",
//       "image": "https://static.toiimg.com/photo/80387978.cms",
//       "type": "SUV",
//       "price": 31000,
//       "rating": 4.5
//     },
//     {
//       "no_plate": "NOP567",
//       "image": "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg",
//       "type": "Hatchback",
//       "price": 17000,
//       "rating": 4.0
//     },
//     {
//       "no_plate": "QRS678",
//       "image": "https://cdn.motor1.com/images/mgl/ZnmO23/414:0:2878:2160/future-cars-2023-2026.webp",
//       "type": "Convertible",
//       "price": 36000,
//       "rating": 4.7
//     },
//     {
//       "no_plate": "TUV789",
//       "image": "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg",
//       "type": "Coupe",
//       "price": 44000,
//       "rating": 4.9
//     },
//     {
//       "no_plate": "UVW890",
//       "image": "https://i.pinimg.com/736x/85/76/2a/85762ad3bb1c1cacc1e05c493ab0e062.jpg",
//       "type": "Wagon",
//       "price": 22000,
//       "rating": 4.3
//     },
//     {
//       "no_plate": "XYZ123",
//       "image": "https://imgd-ct.aeplcdn.com/370x208/n/cw/ec/142739/harrier-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
//       "type": "Sedan",
//       "price": 25000,
//       "rating": 4.5
//     },
//     {
//       "no_plate": "YZA234",
//       "image": "https://www.kbb.com/wp-content/uploads/2022/08/2022-mercedes-amg-eqs-front-left-3qtr.jpg?w=918",
//       "type": "SUV",
//       "price": 33000,
//       "rating": 4.6
//     },
//     {
//       "no_plate": "BCD789",
//       "image": "https://www.topgear.com/sites/default/files/2024/02/ioniq5n.jpeg",
//       "type": "Hatchback",
//       "price": 18500,
//       "rating": 4.2
//     },
//     {
//       "no_plate": "EFG890",
//       "image": "https://images.unsplash.com/photo-1570294646112-27ce4f174e38?ixlib=rb-4.0.3",
//       "type": "Convertible",
//       "price": 37000,
//       "rating": 4.7
//     },
//     {
//       "no_plate": "HIJ234",
//       "image": "https://www.motortrend.com/uploads/2022/08/2022-Bugatti-Chiron-Super-Sport-2-1.jpg",
//       "type": "Coupe",
//       "price": 45000,
//       "rating": 4.9
//     },
//     {
//       "no_plate": "JKL456",
//       "image": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Mercedes-Benz/G-Class/9663/1645178024404/front-left-side-47.jpg",
//       "type": "Wagon",
//       "price": 21000,
//       "rating": 4.4
//     },
//     {
//       "no_plate": "LMN789",
//       "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoNVOa5R3aNRi4mCZaQAMZRSn7J0xx4uL9wQ&usqp=CAU",
//       "type": "Sedan",
//       "price": 24000,
//       "rating": 4.5
//     },
//     {
//       "no_plate": "NOP890",
//       "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6kLGBBNvJYxRImsm2sojl9cHGexOe3p4Zww&usqp=CAU",
//       "type": "SUV",
//       "price": 32000,
//       "rating": 4.7
//     },
//     {
//       "no_plate": "QRS901",
//       "image": "https://www.drivespark.com/images/2022-10/tata-punch-custom-1665476945.jpg",
//       "type": "Hatchback",
//       "price": 17500,
//       "rating": 4.1
//     },
//     {
//       "no_plate": "TUV012",
//       "image": "https://www.topgear.com/sites/default/files/2022/01/1-Nissan-Z-Proto-front-3_4-1.jpg",
//       "type": "Convertible",
//       "price": 36000,
//       "rating": 4.8
//     },
//     {
//       "no_plate": "UVW345",
//       "image": "https://img.drivemag.net/media/default/0001/29/thumb_28613_default_large.jpeg",
//       "type": "Coupe",
//       "price": 43000,
//       "rating": 4.8
//     },
//     {
//       "no_plate": "XYZ678",
//       "image": "https://cdn.carbuzz.com/gallery-images/840x560/832000/600/832674.jpg",
//       "type": "Wagon",
//       "price": 22000,
//       "rating": 4.3
//     },
//     {
//       "no_plate": "YZA890",
//       "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0G2yjV_JrO5tA6Hzgr6hzfwQXK7wGTe9n7Q&usqp=CAU",
//       "type": "Sedan",
//       "price": 25500,
//       "rating": 4.5
//     },
//     {
//       "no_plate": "BCD012",
//       "image": "https://hips.hearstapps.com/hmg-prod/images/2022-bmw-m3-competition-xdrive-212-1654521180.jpg?crop=1xw:1xh;center,top&resize=1200:*",
//       "type": "SUV",
//       "price": 31500,
//       "rating": 4.6
//     },
//     {
//       "no_plate": "EFG234",
//       "image": "https://www.teslarati.com/wp-content/uploads/2020/08/Tesla-Model-3-vs-Model-Y-comparison-13-scaled.jpg",
//       "type": "Hatchback",
//       "price": 18000,
//       "rating": 4.2
//     },
//     {
//       "no_plate": "HIJ456",
//       "image": "https://stimg.cardekho.com/images/carexteriorimages/630x420/Rolls-Royce/Phantom/6784/1563250285076/front-left-side-47.jpg",
//       "type": "Convertible",
//       "price": 35000,
//       "rating": 4.7
//     },
//     {
//       "no_plate": "JKL789",
//       "image": "https://images.hgmsites.net/med/2023-bmw-m3_100831764_m.jpg",
//       "type": "Coupe",
//       "price": 40000,
//       "rating": 4.8
//     },
//     {
//       "no_plate": "LMN012",
//       "image": "https://www.motortrend.com/uploads/sites/10/2023/03/2024-Kia-EV9-19.jpg",
//       "type": "Wagon",
//       "price": 23000,
//       "rating": 4.4
//     },
//     {
//       "no_plate": "NOP234",
//       "image": "https://images.unsplash.com/photo-1628318246693-7f409336dabb?ixlib=rb-4.0.3",
//       "type": "Sedan",
//       "price": 26000,
//       "rating": 4.5
//     },
//     {
//       "no_plate": "QRS345",
//       "image": "https://cdn.motor1.com/images/mgl/6xKRL/s1/chevrolet-silverado-electric-2023.jpg",
//       "type": "SUV",
//       "price": 33000,
//       "rating": 4.6
//     },
//     {
//       "no_plate": "TUV456",
//       "image": "https://static.autox.com/uploads/2018/05/20180511065810_Porsche-911-Carrera-Turbo.jpg",
//       "type": "Hatchback",
//       "price": 19000,
//       "rating": 4.3
//     },
//     {
//       "no_plate": "UVW567",
//       "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrgh2sz_jFq6IKLU8aIjkI15nA6B4kmY1ytQ&usqp=CAU",
//       "type": "Convertible",
//       "price": 37000,
//       "rating": 4.7
//     },
//     {
//       "no_plate": "XYZ890",
//       "image": "https://images.unsplash.com/photo-1595814437912-bd5fdea2d575?ixlib=rb-4.0.3",
//       "type": "Coupe",
//       "price": 45000,
//       "rating": 4.8
//     },
//     {
//       "no_plate": "YZA123",
//       "image": "https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/rolls-royce-ghost-front.jpg?itok=Jn6nfoZg",
//       "type": "Wagon",
//       "price": 21000,
//       "rating": 4.2
//     }
// ]
//   );
const carData=await CarModel.find();
res.status(201).send({ message: "Cars successfully inserted", carData });
} catch (error) {
  console.log(error)
  res.status(500).send({ message: "Error inserting cars", error });
}
});



carRoutes.get("/get-cars", async(req,res)=>{
try {
  const {travelAgencyId}=req.body;
  const travelAgency=await TravelsModel.findOne({_id:travelAgencyId})
  if(!travelAgency){
    return res.send("No Agency found");
    
  }
  const carsData=await CarModel.find({travelAgencyId})
  res.send(carsData);
} catch (error) {

  console.log(error)
  res.send("error in carRoutes");
}
})

//Delete
carRoutes.delete("/delete-car/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCar = await CarModel.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).send("No car found");
    }
    res.send("Car deleted successfully");
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).send("Error in deleting car");
  }
});

carRoutes.patch("/update-car/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedCar = await CarModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCar) {
      return res.status(404).send("No car found");
    }
    res.send(updatedCar);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in updating car details");
  }
});


module.exports = { carRoutes };
