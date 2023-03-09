//vars

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cep = document.getElementById("cep");
const numero = document.getElementById("numero");
const endereco = document.getElementById("endereco");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const ibge = document.getElementById("ibge");
const ddd = document.getElementById("ddd");
const siafi = document.getElementById("siafi");

//preencher o formulario com os dados de retorno da API

function preecherFormulario(dados){

    endereco.value = dados.logradouro;

    bairro.value = dados.bairro;

    cidade.value = dados.localidade;

    estado.value = dados.uf;

    ibge.value = dados.ibge;

    ddd.value = dados.ddd;

    siafi.value = dados.siafi;


}



//Verifica se o que foi digitado pelo usuario é somente números

function eNumero(numero){
    return /^[0-9]+$/.test(numero);

}

//Verifica ce o Cep possui tamanho 8 e so possui numeros
function cepValido(cep){
    return cep.length == 8 && eNumero (cep);
}

//função para pesquisar o CEP via API

async function pesquisarCEP(){

    const cep_value = cep.value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep_value}/json`;
    

    if (cepValido(cep_value)){

        const req = await fetch(url);
        const response = await req.json();
        console.log(endereco);
        if (endereco.hasOwnProperty("erro") ){
            document.getElementById("endereco").value = "CEP não encontrado!"
        } else{
            preecherFormulario(response);
        }
        
    } else {
        document.getElementById("endereco").value = "CEP Incorreto!"
        bairro.value = ''
        cidade.value = ''
        estado.value = ''
    }
    
    
}

function clearAll(){
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const cep = document.getElementById("cep");
    const numero = document.getElementById("numero");
    const endereco = document.getElementById("endereco");
    const bairro = document.getElementById("bairro");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");

    Swal.fire({
        showDenyButton: true,
        title: 'Limpar Campos',
        text: 'Deseja mesmo limpar todos os campos?',
        icon: 'question',
        denyButtonText: 'Não',
        confirmButtonText: 'Sim',
        reverseButtons: true
        
      }).then((result) => {
        if (result.isConfirmed) {
            nome.value = ''
            email.value = ''
            cep.value = ''
            endereco.value = ''
            numero.value = ''
            bairro.value = ''
            cidade.value = ''
            estado.value = ''
            ibge.value = ''
            ddd.value = ''
            siafi.value = ''
          Swal.fire('Campos Limpos!', '', 'success')
        }
    })
}

function saveAlert(){

    Swal.fire({
        showDenyButton: true,
        title: 'Cadastrar Aluno',
        text: 'Deseja mesmo cadastrar aluno?',
        icon: 'question',
        denyButtonText: 'Não',
        confirmButtonText: 'Sim',
        reverseButtons: true
        
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                template: '#my-template'
              })
        }
    })
}

document.getElementById("cep").addEventListener("focusout",pesquisarCEP);
document.getElementById("clear").addEventListener("click",clearAll);
document.getElementById("save").addEventListener("click",saveAlert);