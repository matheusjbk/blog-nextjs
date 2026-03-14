import { InputCheckbox } from "@/components/InputCheckbox";
import { InputText } from "@/components/InputText";

export default async function AdminNewPostPage() {
  return (
    <>
      <div className="">
        <InputCheckbox labelText="Publicado" />

        <InputText
          labelText="Nome"
          placeholder="Digite o seu nome"
        />

        <InputText
          labelText="Sobrenome"
          placeholder="Digite o seu sobrenome"
        />

        <InputText
          disabled
          labelText="Nome"
          placeholder="Digite o seu nome"
        />

        <InputText
          disabled
          labelText="Sobrenome"
          placeholder="Digite o seu sobrenome"
          defaultValue="Silva"
        />

        <InputText
          readOnly
          labelText="Nome"
          placeholder="Digite o seu nome"
        />

        <InputText
          readOnly
          labelText="Sobrenome"
          placeholder="Digite o seu sobrenome"
          defaultValue="Silva"
        />
      </div>
    </>
  );
}
