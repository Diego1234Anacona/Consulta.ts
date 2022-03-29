const XLSX = require('xlsx');

let maximo=0;
let ind=0;
let totalmuertesest=[];
let totalpoblacion=0;
let porcentajemuertesest=[];
let estados=[];
let provincias=[];

function leerarchivo(path){
let ind_est_mayor_porcentaje=0;    
let est_mayor_porcentaje=0;
let est_mayor_acumulado=0;
let est_menor_acumulado=0;
let ind_est_mayor_acumulado=0;
let ind_est_menor_acumulado=0;
let i=0;
    const librodetrabajo=XLSX.readFile(path);
    const hojasdelibrodetrabajo=librodetrabajo.SheetNames;
    const hoja=hojasdelibrodetrabajo[0];
    const datos=XLSX.utils.sheet_to_json(librodetrabajo.Sheets[hoja]);

    for (const campo of datos){
        provincias[i]=campo['Province_State'];

         if (i > 0){
            if (provincias[i-1]==provincias[i])
            {   totalpoblacion=totalpoblacion+campo['Population'];
                maximo=maximo+campo['4/26/21'];
        } else {
                totalmuertesest[ind]=maximo;
                ind=ind+1;  
                estados[ind]=campo['Province_State'];
                porcentajemuertesest[ind]=maximo/totalpoblacion*100;
                maximo=0;
                totalpoblacion=0;
               }
        }else estados[0]=campo['Province_State'];
        i=i+1;
    }
   ind=0; 
   est_menor_acumulado=totalmuertesest[0];   
   do {
    if (porcentajemuertesest[ind] > est_mayor_porcentaje){
        ind_est_mayor_porcentaje=ind;
        est_mayor_porcentaje = porcentajemuertesest[ind];
       }
     if (totalmuertesest[ind] > est_mayor_acumulado){
         ind_est_mayor_acumulado=ind;
         est_mayor_acumulado = totalmuertesest[ind];
        }
     if (totalmuertesest[ind] < est_menor_acumulado){
        ind_est_menor_acumulado = ind; 
        est_menor_acumulado = totalmuertesest[ind];
        }
        console.log('El estado : ',estados[ind],' tuvo un porcentaje de ',porcentajemuertesest[ind],'%');

    ind=ind+1;
   }while (ind <= totalmuertesest.length );

   console.log('El estado con mayor numero de descesos es: ',estados[ind_est_mayor_acumulado],' con un total de ',est_mayor_acumulado);
   console.log('El estado con menor numero de descesos es: ',estados[ind_est_menor_acumulado],' con un total de ',est_menor_acumulado);
   console.log('El estado mas afectado fue: ',estados[ind_est_mayor_porcentaje],' porque tuvo el mayor porcentaje de descesos, para un total de ',est_mayor_porcentaje,'%');
   

}
leerarchivo('time_series_covid19_deaths_US.csv');