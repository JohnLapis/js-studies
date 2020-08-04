var objTelaConsultaPublicaAvandaca = {

	/* function init */
	init: function( param )
	{
		this.param = param;
		//this.pesquisar();

		this.carregarCaptcha();

		$('#atualiza-captcha-avancado').click(function() {
			objTelaConsultaPublicaAvandaca.atualizaCaptcha();
	    });

		$( '#frmConsultaPublicaAvancada' ).submit(function() {
			objTelaConsultaPublicaAvandaca.carregarLocalizacao();
			objTelaConsultaPublicaAvandaca.pesquisar();
		});

        this.controlarOptionBuscarPor();

        $('input[id=consulta_avancada_rad_buscar_por]').click( function() {

           objTelaConsultaPublicaAvandaca.controlarOptionBuscarPor();

        } );

        this.controlarOptionBuscarPor();


        $( '#sel_sg_uf' ).change( function() {

          objTelaConsultaPublicaAvandaca.buscarMunicipio( URL_BASE + 'emec/comum/json/selecionar-municipio' , this );

        } ); // end change sel_sg_uf;



		$( 'select#sel_co_situacao_funcionamento_ies' ).readonly( true );
		$( 'select#sel_co_area_curso' ).readonly( true );

		//Selects Área CINE
		$( '#sel_co_area' ).change( function() {
			objTelaConsultaPublicaAvandaca.buscarAreaEspecifica( URL_BASE + 'emec/comum/json/selecionar-area-especifica',this);

	      } ); // end change sel_co_area_especifica;

	    $( '#sel_co_area_especifica' ).change( function() {

	    	objTelaConsultaPublicaAvandaca.buscarAreaDetalhada( URL_BASE + 'emec/comum/json/selecionar-area-detalhada',this);
	        objTelaConsultaPublicaAvandaca.preencheSelectAreas('geral',this.value);

	      } ); // end change sel_co_area_especifica;

	    $( '#sel_co_area_detalhada' ).change( function() {

	        objTelaConsultaPublicaAvandaca.buscarAreaCurso( URL_BASE + 'emec/comum/json/selecionar-area-curso',this);
	        objTelaConsultaPublicaAvandaca.preencheSelectAreas('especifica',this.value);
	        objTelaConsultaPublicaAvandaca.preencheSelectAreas('geral-especifica',this.value);

	      } ); // end change sel_co_area_detalhada;

	  //fim Selects Área CINE
	},
	/**
	 * Busca a respectiva area e preenche o select com o resultado da busca
	 */
	preencheSelectAreas: function(url,valor) {
		if(valor!=''){
		$.ajax({
    	    type: 'POST',
    	    url: URL_BASE + 'emec/comum/json/'+url,
    	    data: { id: valor },
    	    success: function (data) {

    	    	// Seleciona a opção do filtro (select) anterior da Área CINE
    	    	dadosJSON = JSON.parse(data);

    	    	if(url === 'geral' )
    	    		$("#sel_co_area option[value=" + dadosJSON.id + "]").attr('selected','selected');
    	    	if(url === 'especifica' )
    	    		$("#sel_co_area_especifica option[value=" + dadosJSON.id + "]").attr('selected','selected');
    	    	if(url === 'geral-especifica')
    	    		$("#sel_co_area option[value=" + dadosJSON.id + "]").attr('selected','selected');
    	    },
    	    error: function (request, status, error) {
    	       jAlert(request.response);
    	    }
    	});
		}
	},
	 /* function buscarAreaCurso para preencher area especifica a partir da área geral */
	buscarAreaEspecifica: function( url , obj ) {

      var objArea = $( "#sel_co_area_especifica" );

      if ( obj.value != '' )
      {

            carregarSelectPorJson( url + '/' + md5( "co_area_geral" ) + '/' + base64_encode( obj.value ) , objArea , 'ds_cine_area_especifica' , 'co_cine_area_especifica' , {} , 'Selecione Área Específica' , '' , function(){} );
      }
      else
      {
    	  objTelaConsultaPublicaAvandaca.limparSelectAreaEspecifica();
      }

      var objAreaDetalhada = $( "#sel_co_area_detalhada" );
      carregarSelectPorJson( url + '/' + md5( "co_area_geral" ) + '/' + base64_encode( 0 ) , objArea , 'ds_cine_area_especifica' , 'co_cine_area_especifica' , {} , 'Selecione Área Específica' , '' , function(){} );
      $("#sel_co_area_detalhada option:eq(0)").attr('selected','selected');
      objTelaConsultaPublicaAvandaca.limparSelectAreaCurso();

    } ,
    /* function buscarAreaDetalhada para preencher area detalhada a partir da área específica */
	buscarAreaDetalhada: function( url , obj ) {

      var objArea = $( "#sel_co_area_detalhada" );

      if ( obj.value != '' )
      {

            carregarSelectPorJson( url + '/' + md5( "co_area_especifica" ) + '/' + base64_encode( obj.value ) , objArea , 'ds_cine_area_detalhada' , 'co_cine_area_detalhada' , {} , 'Selecione Área Detalhada' , '' , function(){} );

      }
      else
      {
          carregarSelectPorJson( url + '/' + md5( "co_area_especifica" ) + '/' + base64_encode( 0 ) , objArea , 'ds_cine_area_detalhada' , 'co_cine_area_detalhada' , {} , 'Selecione Área Detalhada' , '' , function(){} );
    	  objTelaConsultaPublicaAvandaca.limparSelectAreaDetalhada();
      }
      objTelaConsultaPublicaAvandaca.limparSelectAreaCurso();
    } ,
	  /* function buscarAreaCurso para preencher select area curso a partir da área detalhada*/
	buscarAreaCurso: function( url , obj ) {

      var objArea = $( "#sel_co_area_curso" );

      if ( obj.value != '' )
      {

          carregarSelectPorJson( url + '/' + md5( "co_area_detalhada" ) + '/' + base64_encode( obj.value ) , objArea , 'ds_cine_area_curso' , 'no_cine_area_curso' , {} , 'Selecione Área Curso' , '' , function(){} );
          $( 'select#sel_co_area_curso' ).readonly( false );
      }
      else
      {
    	  objTelaConsultaPublicaAvandaca.limparSelectAreaCurso();
      }

    },

    /**
     * Desmarca a opção do select "Área CINE > Área Específica" e desabilita o select.
     */
    limparSelectAreaEspecifica: function(){
    	$("#sel_co_area_especifica option:eq(0)").attr('selected','selected');
    },

    /**
     * Desmarca a opção do select "Área CINE > Área Detalhada" e desabilita o select.
     */
    limparSelectAreaDetalhada: function(){
    	$("#sel_co_area_detalhada option:eq(0)").attr('selected','selected');
    },
    /**
     * Desmarca a opção do select "Área CINE > Área Geral" e desabilita o select.
     */
    limparSelectAreaGeral: function(){
    	$("#sel_co_area option:eq(0)").attr('selected','selected');
    },
    /**
     * Desmarca a opção do select "Área CINE > Área Geral" e desabilita o select.
     */
    limparRotuloCine: function(){
    	$("#txt_co_ocde_area_curso").val('');
    },

    /**
     * Desmarca a opção do select "Área CINE > Área Curso" e desabilita o select.
     */
    limparSelectAreaCurso: function(){
    	$( 'select#sel_co_area_curso' ).val('');
    	$( 'select#sel_co_area_curso' ).readonly( true );
    },

	carregarCaptcha: function() {
		var ts  = Math.round(new Date().getTime() / 1000);
	    var url = URL_BASE + 'emec/nova-index/captcha?x=' + ts;
	    $('#captcha-imagem-avancado').attr('src', '')
	                        .attr('src', url);
	},

	atualizaCaptcha: function() {
		var ts  = Math.round(new Date().getTime() / 1000);
        var url = URL_BASE + 'emec/nova-index/captcha?x=' + ts;
        $('#captcha-imagem-avancado').attr('src', '')
                            .attr('src', url);
        return false;
	},

    /* function abrirPopUpDetalhesIes */
    abrirPopUpDetalhesIes: function( intCoIes , strNoIes )
    {
      window.open( URL_BASE + 'emec/consulta-cadastro/detalhamento/' +  md5( 'co_ies' ) + '/' + base64_encode( intCoIes ) );
    } ,

	carregarLocalizacao: function() {
		$('#hid_no_cidade_avancada').val(visitor_city);
        $('#hid_no_regiao_avancada').val(visitor_region);
        $('#hid_no_pais_avancada').val(visitor_country);
        $('#hid_co_pais_avancada').val(visitor_country_code);
	},


    /* function buscarMunicipio */
    buscarMunicipio: function( url , obj ) {

      var objMunicipio = $( "#sel_co_municipio" );

      if ( obj.value != '' )
      {
          carregarSelectPorJson( url + '/' + md5( "sg_uf" ) + '/' + base64_encode( obj.value ) , objMunicipio , 'ds_municipio' , 'co_municipio' , {} , 'Selecione...' , '' , function(){} );

      }
      else
      {
          objMunicipio.empty();
      }

    } ,

	/* function pesquisar */
	pesquisar: function()
	{
		if ( $( '#frmConsultaPublicaAvancada' ).validate() == false )
        {
          return false;
        }// end iF;

		if ( $( "input[name='data[CONSULTA_AVANCADA][rad_buscar_por]']:checked" ).val() == 'IES' )
        {
          if ( !objTelaConsultaPublicaAvandaca.validarCamposIes() )
          {
            var htmlMsg = '<span style="text-align: left">';
            htmlMsg += '<strong style="color:red">Por favor, informe um dos campos abaixo para pesquisar.</strong>';
            htmlMsg += '<ul>';
            htmlMsg += '<li style="text-align: left">- Nome ou Sigla da Institui&ccedil;&atilde;o</li>';
            htmlMsg += '<li style="text-align: left">- UF</li>';
            htmlMsg += '<li style="text-align: left">- Munic&iacute;pio</li>';
            htmlMsg += '<li style="text-align: left">- Categoria Administrativa</li>';
            htmlMsg += '<li style="text-align: left">- Organiza&ccedil;&atilde;o Acad&ecirc;mica</li>';
            htmlMsg += '<li style="text-align: left">- &Iacute;ndice</li>';
            htmlMsg += '<li style="text-align: left">- Situa&ccedil;&atilde;o</li>';
            htmlMsg += '</ul>';
            htmlMsg += '</span>';
            jAlert( htmlMsg , 'Aviso' );
            return false;
          } // end iF;
        }
        else if ( $( "input[name='data[CONSULTA_AVANCADA][rad_buscar_por]']:checked" ).val() == 'CURSO' )
        {
          if ( !objTelaConsultaPublicaAvandaca.validarCamposCurso() )
          {
            var htmlMsg = '<span style="text-align: left">';
            htmlMsg += '<strong style="color:red">Por favor, informe um dos campos abaixo para pesquisar.</strong>';
            htmlMsg += '<ul>';
            htmlMsg += '<li style="text-align: left">- Curso</li>';
            htmlMsg += '<li style="text-align: left">- UF</li>';
            htmlMsg += '<li style="text-align: left">- Munic&iacute;pio</li>';
            htmlMsg += '<li style="text-align: left">- Oferta Gratuita</li>';
            htmlMsg += '<li style="text-align: left">- Modalidade</li>';
            htmlMsg += '<li style="text-align: left">- Grau</li>';
            htmlMsg += '<li style="text-align: left">- &Iacute;ndice</li>';
            htmlMsg += '<li style="text-align: left">- Situa&ccedil;&atilde;o</li>';
            htmlMsg += '</ul>';
            htmlMsg += '</span>';
            jAlert( htmlMsg , 'Aviso' );
            return false;
          } // end iF;
        } // end iF;

		$.post( URL_BASE + 'emec/nova-index/verificar-captcha' , $( '#frmConsultaPublicaAvancada' ).serialize() , function( data )
		{
        	if( data.success == 'OK'){

        		$.post( URL_BASE + 'emec/nova-index/listar-consulta-avancada' , $( '#frmConsultaPublicaAvancada' ).serialize() , function( data )
				{
					$( '#div_listar_consulta_avancada' ).html( data );
					clickImgOrder( 'frmConsultaPublicaAvancada' );
		            carregarTooltip();
				},
				'html' );

        		objTelaConsultaPublicaAvandaca.atualizaCaptcha();
        	}else{
        		jAlert( data.msg, 'Alerta', function(){
        			objTelaConsultaPublicaAvandaca.atualizaCaptcha();
        		});
        	}
		},
		'json' );
        $('#captcha-avancado').val('');
	},

    /* function controlarOptionBuscarPor */
    controlarOptionBuscarPor: function()
    {
      $( "form[id='frmConsultaPublicaAvancada'] > input[id='hid_template']" ).val( '' );
      $( "form[id='frmConsultaPublicaAvancada'] > input[id='hid_order']" ).val( '' );
      $( '#div_listar_consulta_avancada' ).empty();

      switch ( $( "input[name='data[CONSULTA_AVANCADA][rad_buscar_por]']:checked" ).val() ) {
        case 'IES':
            $( '.buscar_por_curso' ).hide();
            $( '.buscar_por_especializacao' ).hide();
            $( '.buscar_por_ies' ).show();
            $( "form[id='frmConsultaPublicaAvancada'] > input[id='hid_template']" ).empty().val( 'listar-consulta-avancada-ies' );
            $( "form[id='frmConsultaPublicaAvancada'] > input[id='hid_order']" ).empty().val( 'ies.no_ies ASC' );

            $( '#sel_no_indice_ies').change( function() {

                desbloquearOneSelectOptions( 'sel_co_indice_ies' , 6 );

                if ( this.value == 'ci' )
                {
                    bloquearOneSelectOptions( 'sel_co_indice_ies' , 6 );
                }

            } );

            objTelaConsultaPublicaAvandaca.limparCampos();

          break;
        case 'CURSO':
          $( '.buscar_por_ies' ).hide();
          $( '.buscar_por_especializacao' ).hide();
          $( '.buscar_por_curso' ).show();
          $( "form[id='frmConsultaPublicaAvancada'] > input[id='hid_template']" ).empty().val( 'listar-consulta-avancada-curso' );
          $( "form[id='frmConsultaPublicaAvancada'] > input[id='hid_order']" ).empty().val( 'ies_curso.no_curso ASC' );

          $( '#sel_no_indice_curso').change( function() {

                desbloquearOneSelectOptions( 'sel_co_indice_curso' , 6 );

                if ( this.value == 'cc' )
                {
                    bloquearOneSelectOptions( 'sel_co_indice_curso' , 6 );
                }

            } );

            objTelaConsultaPublicaAvandaca.limparCampos();

          break;
        case 'ESPECIALIZACAO':
        	$( '.buscar_por_ies' ).hide();
        	$( '.buscar_por_curso' ).hide();
        	$( '.buscar_por_especializacao' ).show();
        	$( "form[id='frmConsultaPublicaAvancada'] > input[id='hid_template']" ).empty().val( 'listar-consulta-avancada-especializacao' );
        	$( "form[id='frmConsultaPublicaAvancada'] > input[id='hid_order']" ).empty().val( 'especializacao.no_especializacao ASC' );

        	$( '#sel_no_indice_curso').change( function() {

        		desbloquearOneSelectOptions( 'sel_co_indice_curso' , 6 );

        		if ( this.value == 'cc' )
        		{
        			bloquearOneSelectOptions( 'sel_co_indice_curso' , 6 );
        		}

        	} );

        	objTelaConsultaPublicaAvandaca.limparCampos();

        	break;
      } // end switch
    } ,

    limparCampos: function() {

      $( '#txt_no_ies' ).val('');
      $( '#txt_no_curso' ).val('');

      $( '#sel_sg_uf' ).val('');

      $( '#sel_co_municipio' ).empty();



      $( '#sel_no_indice_ies' ).val('');
      $( '#sel_co_indice_ies' ).val('');
      $( '#sel_no_indice_curso' ).val('');
      $( '#sel_co_indice_curso' ).val('');
      $( '#sel_co_situacao_funcionamento_ies' ).val( 10035 );
      $( '#sel_co_situacao_funcionamento_curso' ).val('');
      $( '#sel_st_gratuito' ).val('');

      $( "input[id='consulta_avancada_chk_tp_natureza_gn']" ).each( function() {
        this.checked = false;
      } );

      $( "input[id='consulta_avancada_chk_tp_modalidade_gn']" ).each( function() {
          this.checked = false;
      } );

      $( "input[id='consulta_avancada_chk_tp_organizacao_gn']" ).each( function() {
          this.checked = false;
      } );

      $( "input[id='consulta_avancada_chk_tp_tipo_grau_gn']" ).each( function() {
          this.checked = false;
      } );


    } ,

    validarCamposIes: function()
    {
      var boolIes             = true;
      var boolUf              = true;
      var boolMunicipio       = true;
      var boolIndiceIes       = true;
      var boolValorIndiceIes  = true;
      var boolTpNatureza      = true;
      var boolTpOrganizacao   = true;
      var boolSituacaoIes     = true;

        if ( $( '#txt_no_ies' ).val() == '' || $( '#txt_no_ies' ).val() == null )
        {
            boolIes = false;
        } // end iF;

        if ( $( '#sel_sg_uf' ).val() == '' || $( '#sel_sg_uf' ).val() == null )
        {
            boolUf = false;
        } // end iF;

        if ( $( '#sel_co_municipio' ).val() == '' || $( '#sel_co_municipio' ).val() == null )
        {
            boolMunicipio = false;
        } // end iF;

        $( '#consulta_avancada_chk_tp_natureza_gn' ).each( function() {

          if ( !this.checked )
          {
             boolTpNatureza = false;
          } // end iF;

        } ); // end each;

        $( '#consulta_avancada_chk_tp_organizacao_gn' ).each( function() {

          if ( !this.checked )
          {
             boolTpOrganizacao = false;
          } // end iF;

        } ); // end each;


        if ( $( '#sel_no_indice_ies' ).val() == '' || $( '#sel_no_indice_ies' ).val() == null )
        {
            boolIndiceIes = false;
        } // end iF;

        if ( $( '#sel_co_indice_ies' ).val() == '' || $( '#sel_co_indice_ies' ).val() == null )
        {
            boolValorIndiceIes = false;
        } // end iF;

        if ( $( '#sel_co_situacao_funcionamento_ies' ).val() == '' || $( '#sel_co_situacao_funcionamento_ies' ).val() == null )
        {
            boolSituacaoIes = false;
        } // end iF;

        if ( boolIes || boolUf || boolMunicipio || boolIndiceIes || boolValorIndiceIes || boolTpNatureza || boolTpOrganizacao || boolSituacaoIes )
        {
          return true;
        }
        else
        {
          return false;
        }

    } ,

    validarCamposCurso: function()
    {
      var boolCurso             = true;
      var boolUf                = true;
      var boolMunicipio         = true;
      var boolStGratuito        = true;
      var boolTpModalidade      = true;
      var boolTpTipoGrau        = true;
      var boolIndiceCurso       = true;
      var boolValorIndiceCurso  = true;
      var boolSituacaoCurso     = true;

        if ( $( '#txt_no_curso' ).val() == '' || $( '#txt_no_curso' ).val() == null )
        {
            boolCurso = false;
        } // end iF;

        if ( $( '#sel_sg_uf' ).val() == '' || $( '#sel_sg_uf' ).val() == null )
        {
            boolUf = false;
        } // end iF;

        if ( $( '#sel_co_municipio' ).val() == '' || $( '#sel_co_municipio' ).val() == null )
        {
            boolMunicipio = false;
        } // end iF;

        if ( $( '#sel_st_gratuito' ).val() == '' || $( '#sel_st_gratuito' ).val() == null )
        {
            boolStGratuito = false;
        } // end iF;

        $( '#consulta_avancada_chk_tp_modalidade_gn' ).each( function() {

          if ( !this.checked )
          {
             boolTpModalidade = false;
          } // end iF;

        } ); // end each;

        $( '#consulta_avancada_chk_tp_tipo_grau_gn' ).each( function() {

          if ( !this.checked )
          {
             boolTpTipoGrau = false;
          } // end iF;

        } ); // end each;


        if ( $( '#sel_no_indice_curso' ).val() == '' || $( '#sel_no_indice_curso' ).val() == null )
        {
            boolIndiceCurso = false;
        } // end iF;

        if ( $( '#sel_co_indice_curso' ).val() == '' || $( '#sel_co_indice_curso' ).val() == null )
        {
            boolValorIndiceCurso = false;
        } // end iF;

        if ( $( '#sel_co_situacao_funcionamento_curso' ).val() == '' || $( '#sel_co_situacao_funcionamento_curso' ).val() == null )
        {
            boolSituacaoCurso = false;
        } // end iF;

        if ( boolCurso || boolUf || boolMunicipio || boolStGratuito || boolTpModalidade || boolTpTipoGrau || boolIndiceCurso || boolValorIndiceCurso || boolSituacaoCurso )
        {
          return true;
        }
        else
        {
          return false;
        }

    } ,

    /* function abrirPopUpExportarConsulta */
    abrirPopUpExportarConsulta: function( strExt , strNomeConsulta , strNomeTela ) {

     popup( URL_BASE + 'emec/nova-index/gerar-arquivo-relatorio-consultar-avancada?' + $( "#frmFiltroConsultaPublicaAvancada" ).serialize() +
                                                               '&data[CONSULTA_AVANCADA_HIDDEN][hid_format_ext]=' + strExt +
                                                               '&data[CONSULTA_AVANCADA_HIDDEN][hid_st_nome_consulta]=' + strNomeConsulta , strNomeTela );

    },

    /**
	 * Verifica se os critérios de aceitação estão sendo respeitados no momento da exportação detalhada.
	 */
	validarFiltrosExportarDetalhado: function() {
		var filtros = $( "#frmFiltroConsultaPublicaAvancada" ).serialize();

		$.ajax({
    	    type: 'POST',
    	    url: '/emec/nova-index/validar-campos-exportar-detalhado',
    	    data: filtros,
    	    success: function (data) {
    	    	objTelaConsultaPublicaAvandaca.abrirPopUpExportarConsultaDetalhada('xls' , 'curso' , 'relatorio-csv-curso');
    	    },
    	    error: function (request, status, error) {
    	       jAlert(request.response);
    	    }
    	});
	},

	/**
     * Exporta o arquivo do tipo csv, com as informações detalhadas do curso.
     */
    abrirPopUpExportarConsultaDetalhada: function( strExt , strNomeConsulta ) {

        var jqxhr = $.ajax({
            type : 'POST',
            url : URL_BASE + 'emec/nova-index/gerar-arquivo-relatorio-consultar-avancada-detalhada?' + $( "#frmFiltroConsultaPublicaAvancada" ).serialize() +
            '&data[CONSULTA_AVANCADA_HIDDEN][hid_format_ext]=' + strExt +
            '&data[CONSULTA_AVANCADA_HIDDEN][hid_st_nome_consulta]=' + strNomeConsulta,
            success : function(data) {
                File.download(data, jqxhr);
            },
            error : function(request, status, error) {
                jAlert(request.response);
            }
        });
    },

    /**
     * Exporta o arquivo do tipo excel, com as informações detalhadas do curso.
     */
    abrirPopUpExportarConsultaAvancada: function( strExt , strNomeConsulta) {

        var jqxhr = $.ajax({
            type : 'POST',
            url : URL_BASE + 'emec/nova-index/gerar-arquivo-relatorio-consultar-avancada?' + $( "#frmFiltroConsultaPublicaAvancada" ).serialize() +
            '&data[CONSULTA_AVANCADA_HIDDEN][hid_format_ext]=' + strExt +
            '&data[CONSULTA_AVANCADA_HIDDEN][hid_st_nome_consulta]=' + strNomeConsulta,
            success : function(data) {
                File.download(data, jqxhr);
            },
            error : function(request, status, error) {
                jAlert(request.response);
            }
        });
    },

    /**
     * Exporta o arquivo do tipo excel, com o 'Histórico de Índices' da IES.
     */
    abrirPopUpExportarConsultaHistoricoIndices: function(tpConsulta, entidade) {

        var jqxhr = $.ajax({
            type : 'POST',
            url : URL_BASE + 'emec/nova-index/gerar-arquivo-relatorio-historico-indices?' + $( "#frmFiltroConsultaPublicaAvancada" ).serialize() +
            '&tpConsulta=' + tpConsulta +
            '&entidade=' + entidade,
            success : function(data) {
                File.download(data, jqxhr);
            },
            error : function(request, status, error) {
                jAlert(request.response);
            }
        });
    }
}; // end objTelaConsultaPublicaAvandaca