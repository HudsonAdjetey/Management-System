// use client
"use client";
import React from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";

const ToasterMain = (title, details, state) => {
  // Call the toast method
  toast({
    title,
    description: details,
    duration: 3000,
    pauseOnHover: false,
    variant: state,
   
  });
};

const ExampleComponent = () => {
  return (
    <Button
      onClick={() => {
        ToasterMain("Change", "Content success", "networkError");
      }}
    >
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quasi error, aperiam excepturi nihil sapiente, quia quaerat repellat autem corporis numquam, provident amet unde reprehenderit? Aliquam culpa ipsa at tempora ratione eligendi cum delectus laboriosam necessitatibus temporibus eveniet deleniti consequuntur repellendus, voluptates, mollitia doloremque aperiam impedit suscipit? Culpa perspiciatis distinctio numquam voluptate sunt, maxime rerum ea, incidunt odit omnis, voluptatibus sed repellat id dolores voluptatum labore exercitationem sint. Corrupti voluptatem velit nostrum maxime vel quas itaque sequi nobis nesciunt sit expedita labore ut sint fugit voluptas quo eligendi asperiores deleniti ipsum, vitae inventore numquam. Odit facere, necessitatibus quam, quia enim eius odio totam accusantium sunt, ipsa exercitationem maxime quis? Quod ducimus recusandae quo! Culpa inventore quod rem esse unde in dolorem blanditiis, natus consequuntur ab, quisquam itaque quo velit incidunt. Quas, voluptate quaerat temporibus vero natus corrupti ipsa dolorem sit itaque earum accusamus aperiam totam fugiat eaque architecto ex at quibusdam eum debitis sed quae odit delectus. Quos modi voluptatum dignissimos corporis cupiditate iure perferendis ullam! Dolorem a quidem ratione aut. Cupiditate, sequi! Non ipsa, assumenda quo qui nisi exercitationem ratione, illum, quis quibusdam voluptatem quod veritatis iste quos temporibus totam? Dolores impedit voluptatem saepe quod, fugit minus nostrum iure!
    </Button>
  );
};

export default ExampleComponent;
