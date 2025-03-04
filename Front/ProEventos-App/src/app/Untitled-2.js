if (typeof PortoSeguro == "undefined") { PortoSeguro = {}; }
if (typeof PortoSeguro.Tratativas == "undefined") { PortoSeguro.Tratativas = {}; }

PortoSeguro.Tratativas.Meta = {

    OnLoad: function (context) {
        const formContext = context.getFormContext();      
        PortoSeguro.Tratativas.Meta.ConsultarMetaAssumida(formContext);
        var recordId = formContext.data.entity.getId();
        debugger;
        recordId = recordId.replace("{", "").replace("}", "");
        localStorage.setItem("nome",recordId);
    },

    BloquearForm: function (formContext) {
        formContext.ui.controls.forEach(control => {
            if (control?.getDisabled && !control.getDisabled()) {
                control.setDisabled(true);
            }
        });
    },

    ConsultarMetaAssumida: function (formContext) {
        var guidMeta = formContext.data.entity.getId();
        var fetchXml = `
            <fetch>
                <entity name="ttv_metas">
                    <filter>
                        <condition attribute="ttv_metasid" operator="eq" value="` + guidMeta + `" />
                    </filter>
                    <link-entity name="campaign" from="ttv_meta" to="ttv_metasid">
                        <link-entity name="ttv_modelodeacordo" from="ttv_modelodeacordoid" to="ttv_modelodeacordo" alias="modeloacordo">
                            <attribute name="ttv_modelodameta" />
                        </link-entity>
                    </link-entity>
                </entity>
            </fetch>`;

        Xrm.WebApi.retrieveMultipleRecords("ttv_metas", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
            function success(result) {
                if (result.entities.length > 0) {
                    var modelodameta = result.entities[0]["modeloacordo.ttv_modelodameta"];
                    if (modelodameta == 934140000) {
                        PortoSeguro.Tratativas.Meta.BloquearForm(formContext);
                    }
                }
            },
            function (error) {
                console.error("Erro ao executar a consulta FetchXML: " + error.message);
            }
        );
    }
}